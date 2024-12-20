import { useLocation } from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess = () => {
    const location = useLocation();
    const message = location.state?.message;
    const error = location.state?.error;

    return (
        <div className="container">
            {message && (
                <div className="mt-5">
                    <Header title={"Booking Success"} />
                    <div>
                        <h3 className="text-success">Booking Success!</h3>
                        <p className="text-success">{message}</p>
                    </div>
                </div>
            )}
            {error && (
                <div className="mt-5">
                    <Header title={"Booking Error"} />
                    <div>
                        <h3 className="text-danger">Booking Error</h3>
                        <p className="text-danger">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingSuccess;
