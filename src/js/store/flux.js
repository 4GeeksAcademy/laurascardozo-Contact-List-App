
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "https://playground.4geeks.com/contact",
			agenda: [],
		},
		actions: {
			getAgenda: async () => {
				const store = getStore();
				try {
					const response = await fetch(`${store.apiUrl}/agendas/laurascardozo`)
					if (!response.ok) {
						throw new Error("there has been an error");
					}
					const data = await response.json();
					console.log(data);
					setStore({ agenda: data.contacts });
				} catch (error) {
					console.log(error);
				}
			},
			createUser: async () => {
				const store = getStore();
				const response = await fetch(`${store.apiUrl}/agendas/laurascardozo`, { method: "POST" })
				const data = await response.json()
			},
			createContact: async (contact) => {
				const store = getStore()
				const actions = getActions()
				try {
					const response = await fetch(`${store.apiUrl}/agendas/laurascardozo/contacts`,
						{
							method: "POST",
							body: JSON.stringify(contact),
							headers: {
								"Content-type": "application/json",
							},
						}
					);
					if (response.status == 404) {
						actions.createUser();
						actions.createContact(contact);
					}
					if (response.ok) {
						const data = await response.json();
						setStore({ agenda: [...store.agenda, data] })
						alert("creaste un usuario");
					}
				} catch (error) {
					console.log(error)
				}
			},
			editContact: async (id, contact) => {
				const store = getStore();
				const actions = getActions();
				try {
					const response = await fetch(`${store.apiUrl}/agendas/laurascardozo/contacts/${id}`, {
						method: "PUT",
						body: JSON.stringify(contact),
						headers: {
							"Content-type": "application/json",
						},
					});
					const data = await response.json();
					if (response.ok) {
						actions.getAgenda();
					}
				} catch (error) {
					console.log(error);
				};
			},
			deleteContact: async (id) => {
				try {
					const store = getStore();
					const response = await fetch(`${store.apiUrl}/agendas/laurascardozo/contacts/${id}`, {
						method: "DELETE",
					});
					if (!response.ok) {
						alert("No se puede borrar el contacto");
						throw new Error("No se pudo borrar el contacto")
					} else {
						const filteredContact = store.agenda.filter((contact) => contact.id !== id);
						setStore({ agenda: filteredContact })
					}
				} catch (error) {
					console.log(error)
				}
			},
		}
	};
};

export default getState;