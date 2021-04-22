import React from 'react'
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../../config/axios';

function Client({client}) {

    const {_id, name, lastname, company, mail, phone} = client;

    const deleteClient = (idClient) =>  {
		Swal.fire({
			title: '¿Are you sure?',
			text: "This action is irreversible",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: 'Cancel'
		}).then((result) => {
			if (result.value) {
                // Llamado a axios
                axiosClient.delete(`/api/clients/client/${idClient}`)
                    .then(res => {
                        Swal.fire(  
                            'Deleted!', 
                            res.data.message, 
                            'success'
                        );
                    });
                    
			}
		});
	};

    return (
        <li className="cliente">
        <div className="info-cliente">
            <p className="nombre">{lastname}, {name}</p>
            <p className="empresa">Company: {company}</p>
            <p>MAIL: {mail}</p>
            <p>PHONE: {phone}</p>
            <p>CLIENT ID: {_id}</p>
        </div>
        <div className="acciones">
            <Link to={`/clients/update/${_id}`} className="btn btn-verde">
                <i className="fas fa-pen-alt"></i>
                Update Client
            </Link>
            <Link to={`/orders/new/${_id}`} className="btn btn-amarillo">
                <i className="fas fa-plus"></i>
                New Order
            </Link>
            <button 
            type="button" 
            className="btn btn-rojo btn-eliminar"
            onClick={() => deleteClient(_id)}
            >
            <i className="fas fa-times"></i>
                Delete Client
            </button>
        </div>
    </li>
    )
}

export default Client
