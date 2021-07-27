import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const SetList = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
			<Row>
				<Col sm={4}>
					<ListGroup>
						<ListGroup.Item action href="#link1">
							Link 1
						</ListGroup.Item>

						<ListGroup.Item action href="#link2">
							Link 2
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col sm={8}>
					<Tab.Content>
						<Tab.Pane eventKey="#link1">
							{store.setList.data ? (
								store.setList.data.map((item, i) => {
									return (
										<div key={i} className="row">
											<div className="col-1">
												<img
													style={{ height: "2em", "padding-left": "2em" }}
													src={item.images.symbol}
													alt=""
												/>
											</div>
											<div className="col-8 text-center">
												<h1 style={{ "padding-left": "2em" }}> {item.name} </h1>
											</div>
										</div>
									);
								})
							) : (
								<li>hello</li>
							)}
						</Tab.Pane>
						<Tab.Pane eventKey="#link2">
							<h1>h1 2</h1>
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

SetList.propTypes = {
	match: PropTypes.object
};
