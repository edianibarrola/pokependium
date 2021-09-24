import React from "react";
import { Context } from "../store/appContext";

export function Dashboard() {
	const { store, actions } = React.useContext(Context);

	// React.useEffect(
	// 	() => {
	// 		if (store.owned == null) {
	// 			actions.getUserOwnedCards();
	// 		}
	// 	},
	// 	[store.authToken]
	// );

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-12">
					<h3>Dashboard</h3>
					Hello, Pokefriend! you currently own {store.owned != null ? store.owned.length : "Loading"}{" "}
					different cards!
				</div>
				<div className="col-12">
					<button className="btn btn-outline-primary" onClick={() => actions.logout()}>
						Exit
					</button>
				</div>
			</div>
		</div>
	);
}
