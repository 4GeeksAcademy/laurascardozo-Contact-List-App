import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="container mx-auto">
			<div className="d-flex justify-content-end my-4">
				<Link to="/Add" className="btn btn-success">Create new contact</Link>
			</div>

			<div className="card">
				<div className="d-flex">
					<div className="d-flex justify-content-center"><img src="https://picsum.photos/id/64/367/267" className="rounded" /></div>
					<div className="ms-5 mt-3">
						<div><h2 className="my-3">Laura Cardozo</h2></div>
						<div className="d-flex"><i class="fas fa-map-marker-alt mt-1"></i><p className="px-3">127 Calle Bellavista</p></div>
						<div className="d-flex"><i class="fas fa-envelope mt-1"></i><p className="px-3">laucardozo@gmail.com</p></div>
						<div className="d-flex"><i class="fas fa-phone mt-1"></i><p className="px-3">3135069859</p></div>
						<div className="d-flex">
							<button className="btn btn-primary me-2">Edit contact</button>
							<button className="btn btn-danger"> Delete
							</button>
						</div>
					</div>
				</div>
			</div>

			{store.agenda.map((contact) => {
				return (

					<div className="card mt-3 " key={contact.id}>
						<div className="d-flex">
							<div className="d-flex justify-content-center"><img src="https://picsum.photos/id/64/367/267" className="rounded" /></div>
							<div className="ms-5 mt-3">
								<div><h2 className="my-3">{contact.name}</h2></div>
								<div className="d-flex"><i class="fas fa-map-marker-alt mt-1"></i><p className="px-3">{contact.address}</p></div>
								<div className="d-flex"><i class="fas fa-envelope mt-1"></i><p className="px-3">{contact.email}</p></div>
								<div className="d-flex"><i class="fas fa-phone mt-1"></i><p className="px-3">{contact.phone}</p></div>
								<div className="d-flex">
									<Link to={`/edit/${contact.id}`} className="btn btn-primary me-2">Edit contact</Link>
									<button className="btn btn-danger" onClick={() => actions.deleteContact(contact.id)}> Delete
									</button>
								</div>
							</div>
						</div>
					</div>

				)
			})}
		</div>

	)

};