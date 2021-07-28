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
		<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link0">
			<Row>
				<Col sm={4}>
					<ListGroup>
						{store.setList.data
							? store.setList.data.map((item, i) => {
									return (
										<ListGroup.Item key={i} action href={`#link${i}`}>
											<div className="row">
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
										</ListGroup.Item>
									);
							  })
							: "name"}

						<ListGroup.Item action href="#link2">
							Link 2
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col sm={8}>
					<Tab.Content>
						{store.setList.data ? (
							store.setList.data.map((item, i) => {
								return (
									<Tab.Pane key={i} eventKey={`#link${i}`}>
										<div className="row">
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
									</Tab.Pane>
								);
							})
						) : (
							<li>hello</li>
						)}
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

SetList.propTypes = {
	match: PropTypes.object
};
