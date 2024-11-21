import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logout from "../auth/Logout";

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 830);

    const handleDropdownToggle = () => {
        if (isSmallScreen) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    };

    const handleDropdownItemClick = () => {
        if (isSmallScreen) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 830);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isDropdownOpen) {
            setIsDropdownVisible(true);
        } else {
            const timer = setTimeout(() => {
                setIsDropdownVisible(false);
            }, 300); // Match the duration of the CSS transition
            return () => clearTimeout(timer);
        }
    }, [isDropdownOpen]);

    const isLoggedIn = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-2 shadow sticky-top">
            <div className="container-fluid m-2">
                <Link to={"/"} className="navbar-brand border-0">
                    <span className="hotel-color">lakeSide Hotel</span>
                </Link>
                {isSmallScreen ? (
                    <>
                        <button
                            className={`navbar-toggler`}
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

                        <div className={`collapse navbar-collapse mx-2 ${isDropdownOpen ? "show" : ""}`} onClick={handleDropdownItemClick} id="navbarScroll">
                            <ul className={`navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll ${isDropdownVisible ? "visible" : "invisible"}`}>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"} >
                                        Browse all rooms
                                    </NavLink>
                                </li>

                                {isLoggedIn && userRole === "ROLE_ADMIN" && (
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to={"/admin"} >
                                            Admin
                                        </NavLink>
                                    </li>
                                )}
                            </ul>

                            <ul className={`d-flex navbar-nav navbar-nav-scroll ${isDropdownVisible ? "visible" : "invisible"}`}>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={"/find-booking"} >
                                        Find my booking
                                    </NavLink>
                                </li>

                                {isLoggedIn ? (
                                    <Logout />
                                ) : (
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/login"}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className={`collapse navbar-collapse mx-2`} id="navbarScroll">
                        <ul className={`navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll`}>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                                    Browse all rooms
                                </NavLink>
                            </li>

                            {isLoggedIn && userRole === "ROLE_ADMIN" && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                                        Admin
                                    </NavLink>
                                </li>
                            )}
                        </ul>

                        <ul className={`d-flex navbar-nav`}>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/find-booking"}>
                                    Find my booking
                                </NavLink>
                            </li>

                            {isLoggedIn ? (
                                <Logout />
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/login"}>
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
