import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const CardHoverModal = props => {
	const { store, actions } = useContext(Context);

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{store.currentCard.data ? store.currentCard.data[0].name : "...card name loading"}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row">
					<div className="col">
						<img
							src={store.currentCard.data ? store.currentCard.data[0].images.large : "...image loading"}
							alt=""
						/>
					</div>

					<div className="col">
						{store.currentCard.data
							? store.currentCard.data[0].attacks.map((attack, i) => {
									return (
										<div key={i} className="row">
											<div className="col">{attack.name}:</div>
											<div className="col">{attack.text}</div>
										</div>
									);
							  })
							: "...image loading"}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};
