const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [],
			owned: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			setList: [],
			cardList: [],
			currentSetID: [],
			currentSet: [],
			currentCard: [],
			currentCardID: [],
			apiURL: "https://3001-indigo-boa-tl7584lz.ws-us14.gitpod.io/"
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			getSetList: () => {
				// fetching sets from pokemontcg.io api
				fetch("https://api.pokemontcg.io/v2/sets")
					.then(resp => resp.json())
					.then(data => setStore({ setList: data }))
					.catch(error => console.log("Error fetching Sets from pokemontcg.io api", error));
			},
			getCardList: () => {
				// fetching cards from the pokemontcg.io
				fetch("https://api.pokemontcg.io/v2/cards")
					.then(resp => resp.json())
					.then(data => setStore({ cardList: data }))
					.catch(error => console.log("Error fetching Cards from pokemontcg.io api", error));
			},
			getCardsForSet: setID => {
				// fetching all cards from specific set from the pokemontcg.io
				fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setID}&orderBy=number`)
					.then(resp => resp.json())
					.then(data => setStore({ currentSet: data }))
					.catch(error => console.log("Error fetching Cards from pokemontcg.io api", error));
			},
			setCurrentSetID: setID => {
				const store = getStore();
				const actions = getActions();

				setStore({ currentSetID: setID });
				actions.getCardsForSet(setID);
			},
			getSingleCard: cardID => {
				// fetching a single card by card ID from the pokemontcg.io
				fetch(`https://api.pokemontcg.io/v2/cards?q=id:${cardID}`)
					.then(resp => resp.json())
					.then(data => setStore({ currentCard: data }))
					.catch(error => console.log("Error fetching Single Card Info from pokemontcg.io api", error));
			},
			setSingleCardID: cardID => {
				const store = getStore();
				const actions = getActions();

				setStore({ currentCardID: cardID });
				actions.getSingleCard(cardID);
			},
			//
			registerUser: (email, password) => {
				fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					mode: "cors",
					body: JSON.stringify({ email, password }),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						if (resp.status !== 204) {
							throw new Error("register-error");
						}

						getActions().loginUser(email, password);
					})
					.catch(error => setStore({ authError: error, authToken: null }));
			},

			logout: () => setStore({ authToken: null }),

			loginUser: (email, password) => {
				const store = getStore();
				const actions = getActions();

				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					mode: "cors",
					body: JSON.stringify({ email, password }),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						if (resp.status !== 200) {
							throw new Error("authentication-error");
						}

						return resp.json();
					})
					.then(data => {
						setStore({
							authToken: data.token,
							authError: null
						});
						actions.getUserOwnedCards();
					})
					.catch(error => setStore({ authToken: null, authError: error }));
			},
			getUserOwnedCards: () => {
				const store = getStore();
				const actions = getActions();

				fetch(process.env.BACKEND_URL + "/api/usercards", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.authToken
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ owned: data.details }))
					.catch(error => console.log("Error fetching User Owned Cards", error));
			},
			updateUserOwnedCard: card => {
				const store = getStore();
				const actions = getActions();
				console.log(card + "this is the console from update");
				fetch(process.env.BACKEND_URL + "/api/updatecard", {
					method: "PUT", // or 'POST'
					body: JSON.stringify(card), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.authToken
					}
				})
					.then(res => res.json())
					.then(response => {
						console.log("Success:", JSON.stringify(response));
						actions.getUserOwnedCards();
					})
					.catch(error => console.error("Error:", error));
			}
		}
	};
};

export default getState;
