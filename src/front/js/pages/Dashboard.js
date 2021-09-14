import React from "react";
import { Context } from "../store/appContext";

export function Dashboard() {
	const { store, actions } = React.useContext(Context);

	React.useEffect(
		() => {
			if (store.owned == null) {
				actions.getUserOwnedCards();
			}
		},
		[store.authToken]
	);

	return (
		<div>
			<h3>Dashboard</h3>
			<button className="btn btn-outline-primary" onClick={() => actions.logout()}>
				Exit
			</button>
		</div>
	);
}
