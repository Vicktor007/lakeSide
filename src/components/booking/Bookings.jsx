import { useState, useEffect } from "react";
import { cancelBooking, getAllBookings } from "../utils/ApiFunctions";
import Header from "../common/Header";
import BookingsTable from "./BookingsTable";
import { BounceLoader } from "react-spinners";

const Bookings = () => {
    const [bookingInfo, setBookingInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            getAllBookings()
                .then((data) => {
                    setBookingInfo(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setIsLoading(false);
                });
        }, 1000);
    }, []);

    const handleBookingCancellation = async (bookingId) => {
        try {
            setCancelLoading((prev) => ({ ...prev, [bookingId]: true }));
            await cancelBooking(bookingId);
            const data = await getAllBookings();
            setBookingInfo(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setCancelLoading((prev) => ({ ...prev, [bookingId]: false }));
        }
    };

    return (
        <section style={{ backgroundColor: "whitesmoke" }} className="pb-5">
            <Header title={"Existing Bookings"} />
            {error && <div className="text-danger">{error}</div>}
            {isLoading ? (
                <div className="d-flex align-items-center justify-content-center mt-5">
                    <BounceLoader color='rgb(169, 77, 123)' size={24} />
                    <span className="ms-2">Loading existing bookings...</span>
                </div>
            ) : (
                <BookingsTable
                    cancelLoading={cancelLoading}
                    bookingInfo={bookingInfo}
                    handleBookingCancellation={handleBookingCancellation}
                />
            )}
        </section>
    );
};

export default Bookings;
