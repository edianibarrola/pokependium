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

	return (
		<div>
			{store.cardList.data ? (
				store.cardList.data.map((item, i) => {
					if (item.set.id.startsWith(props.setId)) {
						return (
							<div className="row">
								<div className="col-auto">
									<img onClick={() => setModalShow(true)} src={item.images.small} alt="" />
								</div>
								{/* <Button variant="primary" onClick={() => setModalShow(true)}>
									Launch vertically centered modal
								</Button> */}
								<CardHoverModal
									card={item.images.large}
									show={modalShow}
									onHide={() => setModalShow(false)}
								/>
								<div className="col d-flex align-items-center">{item.name}</div>
								<div className="col-auto d-flex flex-column justify-content-center align-items-center">
									<div>Standard</div>
									<input type="checkbox" />
								</div>
								<div className="col-auto d-flex flex-column justify-content-center align-items-center">
									<div>Holographic</div>
									<input type="checkbox" />
								</div>
							</div>
						);
					}
				})
			) : (
				<h1>oops</h1>
			)}
		</div>
	);
};
CardList.propTypes = {
	match: PropTypes.object,
	setId: PropTypes.string //to be able to sort through all the cards based off the set id
};
