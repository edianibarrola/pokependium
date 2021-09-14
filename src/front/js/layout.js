import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { SetList } from "./pages/setlist";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { SignIn } from "./pages/signin";
import { RegisterUser } from "./pages/RegisterUser";
import { LoginUser } from "./pages/LoginUser";
import { Dashboard } from "./pages/Dashboard";
import { SecurePage } from "./component/SecurePage";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex h-100 flex-column mt-5">
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
						{/* <Route exact path="/signin">
							<div className="container mt-5">
								<SignIn />
							</div>
						</Route> */}
						<Route exact path="/setlist">
							<div className="container mt-5">
								<SecurePage>
									<SetList />
								</SecurePage>
							</div>
						</Route>
						<Route exact path="/register">
							<RegisterUser />
						</Route>

						<Route exact path="/login">
							<LoginUser />
						</Route>

						<Route exact path="/dashboard">
							<SecurePage>
								<Dashboard />
							</SecurePage>
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
