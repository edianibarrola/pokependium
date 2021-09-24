import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Navbar = () => {
	const { store, actions } = React.useContext(Context);

	return (
		<nav className="navbar navbar-light px-3 fixed-top">
			<Link className="navbar-brand mb-0 h1" to="/">
				Pokependium
			</Link>
			{store.authToken != null ? (
				<div className="ml-auto ">
					<Link to="/setlist">
						<button className="btn ">Card Sets</button>
					</Link>
					<Link to="/dashboard">
						<button className="btn ">Dashboard</button>
					</Link>
					<Link to="/help">
						<button className="btn ">Help</button>
					</Link>
				</div>
			) : (
				<div className="ml-auto ">
					<Link to="/help">
						<button className="btn ">Help</button>
					</Link>
					<Link to="/register">
						<button className="btn ">Register</button>
					</Link>

					<Link to="/login">
						<button className="btn ">Login</button>
					</Link>
				</div>
			)}
		</nav>
	);
};
