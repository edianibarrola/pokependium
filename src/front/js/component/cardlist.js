import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { CardHoverModal } from "./cardhovermodal";

export const CardList = props => {
	const { store, actions } = useContext(Context);
	const [modalShow, setModalShow] = React.useState(false);
	const params = useParams();

	const clickFunction = id => {
		setModalShow(true);
		actions.setSingleCardID(id);
	};
	return (
		<div className="cardListBG">
			<CardHoverModal show={modalShow} onHide={() => setModalShow(false)} />
			{store.currentSet.data ? (
				store.currentSet.data.map((item, i) => {
					if (item.set.id.startsWith(props.setId)) {
						return (
							<div key={i} className="row mb-2 d-flex justify-content-around">
								<div className="col-auto">
									<img
										onClick={() => {
											clickFunction(item.id);
										}}
										style={{ height: "8em" }}
										src={item.images.small}
										alt=""
									/>
								</div>
								{/* <Button variant="primary" onClick={() => setModalShow(true)}>
									Launch vertically centered modal
								</Button> */}

								<div className="col-3 d-flex align-items-center">{item.name}</div>
								<div className="col-auto d-flex flex-column justify-content-center align-items-center">
									<div>Standard</div>
									{store.owned.find(card => card.card_id == item.id) ? (
										store.owned.find(card => card.card_id == item.id).standard_art == true ? (
											<input
												type="checkbox"
												value="true"
												checked
												onClick={e => {
													let newcard = store.owned.find(card => card.card_id == item.id);
													newcard.standard_art = false;
													actions.updateUserOwnedCard(newcard);
												}}
											/>
										) : (
											<input
												type="checkbox"
												value="false"
												onClick={e => {
													let newcard = store.owned.find(card => card.card_id == item.id);
													newcard.standard_art = true;
													actions.updateUserOwnedCard(newcard);
												}}
											/>
										)
									) : (
										<input type="checkbox" value="false" />
									)}
									{/* <input type="checkbox" value="true" /> */}

									{store.owned.find(card => card.card_id == item.id) ? (
										store.owned.find(card => card.card_id == item.id).standard_qty != null ? (
											<input
												type="number"
												value={store.owned.find(card => card.card_id == item.id).standard_qty}
												style={{ width: "4em" }}
												onChange={e => {
													let newcard = store.owned.find(card => card.card_id == item.id);
													newcard.standard_qty = e.target.value;
													actions.updateUserOwnedCard(newcard);
												}}
											/>
										) : (
											<input type="number" style={{ width: "4em" }} />
										)
									) : (
										<input type="number" style={{ width: "4em" }} />
									)}
								</div>
								<div className="col-auto d-flex flex-column justify-content-center align-items-center">
									<div>Alternate</div>
									{store.owned.find(card => card.card_id == item.id) ? (
										store.owned.find(card => card.card_id == item.id).alternate_art == true ? (
											<input
												type="checkbox"
												value="true"
												checked
												onClick={e => {
													let newcard = store.owned.find(card => card.card_id == item.id);
													newcard.alternate_art = false;
													actions.updateUserOwnedCard(newcard);
												}}
											/>
										) : (
											<input
												type="checkbox"
												value="false"
												onClick={e => {
													let newcard = store.owned.find(card => card.card_id == item.id);
													newcard.alternate_art = true;
													actions.updateUserOwnedCard(newcard);
												}}
											/>
										)
									) : (
										<input type="checkbox" value="false" />
									)}

									{store.owned.find(card => card.card_id == item.id) ? (
										store.owned.find(card => card.card_id == item.id).alternate_qty != null ? (
											<input
												type="number"
												value={store.owned.find(card => card.card_id == item.id).alternate_qty}
												style={{ width: "4em" }}
												onChange={e => {
													let newcard = store.owned.find(card => card.card_id == item.id);
													newcard.alternate_qty = e.target.value;
													actions.updateUserOwnedCard(newcard);
												}}
											/>
										) : (
											<input type="number" style={{ width: "4em" }} />
										)
									) : (
										<input type="number" style={{ width: "4em" }} />
									)}
								</div>
							</div>
						);
					}
				})
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
};
CardList.propTypes = {
	match: PropTypes.object,
	setId: PropTypes.string //to be able to sort through all the cards based off the set id
};
