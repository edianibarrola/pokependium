import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

export const CardList = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="row">
			<div className="col-auto">
				<img src="https://via.placeholder.com/150" alt="" />
			</div>
			<div className="col d-flex align-items-center">Card Name</div>
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
};
CardList.propTypes = {
	match: PropTypes.object
};
