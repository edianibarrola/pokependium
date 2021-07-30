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
				<Link to="/demo">
					<button className="btn ">Sets {"&"} Cards</button>
				</Link>
			</div>
		</nav>
	);
};
