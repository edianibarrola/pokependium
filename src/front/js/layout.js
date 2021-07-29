import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { SetList } from "./pages/setlist";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex h-100 flex-column ">
			<BrowserRouter basename={basename}>
				<div className="mb-5">
					<Navbar />
				</div>
				<ScrollToTop>
					<Switch>
						<Route exact path="/">
							<div className="container mt-5">
								<Home />
							</div>
						</Route>
						<Route exact path="/setlist">
							<div className="container mt-5">
								<SetList />
							</div>
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
