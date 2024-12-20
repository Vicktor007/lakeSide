import  { useEffect, useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./auth"
import { BounceLoader } from "react-spinners"

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [loading, setLoading] = useState(false);
	const [showMessage, setShowMessage] = useState(true);
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const message = location.state && location.state.message
	
	useEffect(() => { if ( message) { const timer = setTimeout(() => { setShowMessage(false); }, 5000);
		// 5 seconds 
		return () => clearTimeout(timer);
		// Cleanup the timer on component unmount
		} }, [message]);

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true);
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			auth.handleLogin(token)
			navigate(redirectUrl, { replace: true })
			window.location.reload();
		} 
		
		} catch (error) {
			setErrorMessage("Invalid username or password. Please try again.")
			setTimeout(() => {
				setErrorMessage("")
			}, 4000)
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="container col-6 mt-5 mb-5">
			{message && showMessage && (<h6 className="text-success text-center">{message}</h6>)}
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div className="row mb-3">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={login.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row mb-3">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control"
							value={login.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3">
				

				<button disabled={loading} type="submit" className="btn btn-hotel d-flex align-items-center justify-content-center" style={{ marginRight: "10px" }}>
						{loading ? ( <> <BounceLoader color='rgb(169, 77, 123)' size={24} /> 
						<span className="ms-2">Logging in...</span> </> ) : ( "Login" )} </button>

					<span style={{ marginLeft: "10px" }}>
						Don&apos;t have an account yet?<Link to={"/register"}> Register</Link>
					</span>
				</div>
			</form>
		</section>
	)
}

export default Login
