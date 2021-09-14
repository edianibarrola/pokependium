import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light  fixed-top">
			<Link to="/">
				<span className="navbar-brand mb-0 p-3 h2">
					<button className="btn"> Pokependium</button>
				</span>
			</Link>
			<div className="ml-auto p-3">
				<Link to="/register">
					<button className="btn ">Register</button>
				</Link>
			</div>
			<div className="ml-auto p-3">
				<Link to="/login">
					<button className="btn ">Login {"&"} Cards</button>
				</Link>
			</div>
			<div className="ml-auto p-3">
				<Link to="/setlist">
					<button className="btn ">Set List</button>
				</Link>
			</div>
		</nav>
	);
};
