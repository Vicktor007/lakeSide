
// import { NavLink, Link } from "react-router-dom"
// import Logout from "../auth/Logout"



// const NavBar = () => {
	
// 	// const [showAccount, setShowAccount] = useState(false)

// 	// const handleAccountClick = () => {
// 	// 	setShowAccount(!showAccount)
// 	// }


// 	const isLoggedIn = localStorage.getItem("token")
// 	const userRole = localStorage.getItem("userRole")

// 	return (
// 		<nav className="navbar  navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
// 			<div className="container-fluid m-2">
// 				<Link to={"/"} className="navbar-brand">
// 					<span className="hotel-color">lakeSide Hotel</span>
// 				</Link>

// 				<button
// 					className="navbar-toggler"
// 					type="button"
// 					data-bs-toggle="collapse"
// 					data-bs-target="#navbarScroll"
// 					aria-controls="navbarScroll"
// 					aria-expanded="false"
// 					aria-label="Toggle navigation">
// 					<span className="navbar-toggler-icon"></span>
// 				</button>

// 				<div className="collapse navbar-collapse mx-2" id="navbarScroll" >
// 					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
// 						<li className="nav-item">
// 							<NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
// 								Browse all rooms
// 							</NavLink>
// 						</li>

// 						{isLoggedIn && userRole === "ROLE_ADMIN" && (
// 							<li className="nav-item">
// 								<NavLink className="nav-link" aria-current="page" to={"/admin"}>
// 									Admin
// 								</NavLink>
// 							</li>
// 						)}
// 					</ul>

// 					<ul className="d-flex navbar-nav">
// 						<li className="nav-item">
// 							<NavLink className="nav-link" to={"/find-booking"}>
// 								Find my booking
// 							</NavLink>
// 						</li>

						
// 						{isLoggedIn ? (
							
// 								<Logout className="nav-link" />
							
									
// 								) : (
// 									<li className="nav-item">
// 										<Link className="nav-link" to={"/login"}>
// 											Login
// 										</Link>
// 									</li>
// 								)}	

							
						
// 					</ul>
// 				</div>
// 			</div>
// 		</nav>
// 	)
// }

// export default NavBar

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logout from "../auth/Logout";

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownItemClick = () => {
        setIsDropdownOpen(false);
    };

    const isLoggedIn = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
            <div className="container-fluid m-2">
                <Link to={"/"} className="navbar-brand">
                    <span className="hotel-color">lakeSide Hotel</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={handleDropdownToggle}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse mx-2 ${isDropdownOpen ? "show" : ""}`} id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"} onClick={handleDropdownItemClick}>
                                Browse all rooms
                            </NavLink>
                        </li>

                        {isLoggedIn && userRole === "ROLE_ADMIN" && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/admin"} onClick={handleDropdownItemClick}>
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <ul className="d-flex navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/find-booking"} onClick={handleDropdownItemClick}>
                                Find my booking
                            </NavLink>
                        </li>

                        {isLoggedIn ? (
                            <Logout className="nav-link" />
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"} onClick={handleDropdownItemClick}>
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
