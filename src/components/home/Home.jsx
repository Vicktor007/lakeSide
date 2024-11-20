
import MainHeader from "../layout/MainHeader"
import HotelService from "../common/HotelService"
import Parallax from "../common/Parallax"
import RoomCarousel from "../common/RoomCarousel"
import RoomSearch from "../common/RoomSearch"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

const Home = () => {
	const location = useLocation()
	const [showMessage, setShowMessage] = useState(true);

	const message = location.state && location.state.message
	const currentUser = localStorage.getItem("userId")
	useEffect(() => { if (currentUser || message) { const timer = setTimeout(() => { setShowMessage(false); }, 5000);
		// 5 seconds 
		return () => clearTimeout(timer);
		// Cleanup the timer on component unmount
		} }, [currentUser,message]);
	return (
		<section>
			{message && showMessage && (<h6 className="text-warning text-center">{message}</h6>)}
			{currentUser && showMessage && ( <h6 className="text-success text-center">You are logged-In as {currentUser}</h6> )}
			<MainHeader />
			<div className="container">
				<RoomSearch />
				<RoomCarousel />
				<Parallax />
				<HotelService />
				<RoomCarousel />
			</div>
		</section>
	)
}

export default Home
