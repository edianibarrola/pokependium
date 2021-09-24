import React from "react";
import { Link } from "react-router-dom";

export const Help = () => {
	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col text-center">
					<h1>How it works.</h1>
					<br /> <br />
					<h2>Creating an account and Signing in.</h2>
					<p>
						<sup>Step 1</sup> If you do not have an account yet, please register{" "}
						<Link to="/register">by clicking here</Link>
					</p>
					<p>
						<sup>Step 2</sup> Once you have created an account, you can log in{" "}
						<Link to="/login">by clicking here</Link>
					</p>
					<p>
						<sup>{"ATTENTION!"}</sup> Please make sure to remember your password as there is currently no
						way to reset it.
					</p>
					<br /> <br />
					<h2>Viewing Cards</h2>
					<p>
						<sup>Step 1</sup> Once you have signed in, click on the Set List button in the Navbar or{" "}
						<Link to="/setlist">click here</Link> to see a list of each Card Set.
					</p>
					<p>
						<sup>Step 2</sup> Select which Set you would like to view from the list by clicking it. The
						indivdual cards for that set will be displayed{" "}
					</p>
					<p>
						<sup>{"ATTENTION!"}</sup> Please be patient. The server sometimes takes a bit of time to load
						all the card images.
					</p>
					<br /> <br />
					<h2>Marking Cards that you own.</h2>
					<p>
						<sup>Step 1</sup> Before adding a card to your collection, it will display two un-checked
						checkboxes (one for Standard Art, and one for Alternate Art).{" "}
					</p>
					<p>
						<sup>Step 2</sup> Click whichever checkbox corresponds to the card that you own. (standard is
						usually plain, alternate is usually holo/reverse although not always!)
					</p>
					<p>
						<sup>Step 3</sup> The numeric fields will be automatically filled in and you can begin to
						increase or decrease them to display the actual quantity of that card that you own.
					</p>
					<p>
						<sup>{"ATTENTION!"}</sup> If you own both styles of a card, make sure to click the checkbox for
						the 2nd version of the card before attempting to adjust the quantity or it will reset to 1 when
						you check the box.
					</p>
				</div>
			</div>
		</div>
	);
};
