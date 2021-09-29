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
			<p>A simple site to track your collection and help you catch em all.</p>
			<Link to="/login">
				<div className="row d-flex justify-content-center  flex-column">
					<div className=" mx-auto col-2 cssPokeball" style={{ "min-height": "200px", "min-width": "200px" }}>
						<div className="pokeballTop " />
						<div className="pokeballMid " />
						<div className="pokeballBot " />
					</div>
					<Link to="/help">
						<button className="btn my-5">How it works.</button>
					</Link>
				</div>
			</Link>
		</div>
	);
};
