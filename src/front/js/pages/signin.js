import React, { useState, useStore } from "react";
import { Link, useHistory } from "react-router-dom";

export const SignIn = props => {
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const history = useHistory();
	const handleUserName = e => {
		setUserName(e.target.value);
	};
	const handleUserPassword = e => {
		setUserPassword(e.target.value);
	};
	const handleUserEmail = e => {
		setUserEmail(e.target.value);
	};
	const handleSubmit = () => {
		const [store, actions] = useStore();
		setStore({
			user: {
				username: userName,
				email: userEmail,
				password: userPassword
			}
		});
		console.log(newUser);
		actions.addNewUser(newUser);
		return newUser;
	};
	return (
		<div>
			<form>
				<div className="col">
					<input
						type="text"
						className="userInput"
						value={userName}
						placeholder="Username"
						onChange={e => handleUserName(e)}
					/>
				</div>
				<div className="col">
					<input
						type="email"
						className="userEmail"
						value={userEmail}
						placeholder="Email"
						onChange={e => handleUserEmail(e)}
					/>
				</div>
				<div className="col">
					<input
						type="text"
						className="userPassword"
						placeholder="Password"
						value={userPassword}
						onChange={e => handleUserPassword(e)}
					/>
				</div>
				<button
					onClick={() => {
						handleSubmit;
						history.push("/");
					}}>
					Sign Up
				</button>
			</form>
		</div>
	);
};
