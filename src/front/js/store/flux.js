const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			cardList: []
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
			}
		}
	};
};

export default getState;
