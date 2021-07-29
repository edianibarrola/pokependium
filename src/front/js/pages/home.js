import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Pokependium</h1>
			<Link to="/setlist">
				<div className="row d-flex justify-content-center flex-column">
					<div
						className="cssPokeball"
						style={{ "min-height": "200px", "min-width": "200px", "padding-right": "100px" }}>
						<div className="pokeballTop" />
						<div className="pokeballMid" />
						<div className="pokeballBot" />
					</div>
				</div>
			</Link>
			<div className="alert alert-info">{store.message || "Loading message from the backend..."}</div>
		</div>
	);
};
