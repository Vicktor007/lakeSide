import { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { NavLink, useNavigate } from "react-router-dom"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: " You have been logged out!" } })
		window.location.reload();
	}

	return (
		<>
			<li className="nav-item">
				<NavLink className="nav-link" to={"/profile"}>
					Profile
				</NavLink>
			</li>
			<li>
				<hr className="dropdown-divider" />
			</li>
			<li className="nav-item">
			<button className="nav-link" onClick={handleLogout}>
				Logout
			</button>
			</li>
		</>
	)
}

export default Logout
