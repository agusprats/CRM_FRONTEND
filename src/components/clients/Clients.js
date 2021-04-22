import React, {useEffect, useState, Fragment} from 'react';
import axiosClient from '../../config/axios';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Client from './Client';

export default function Clients() {

const [clients, setClients] = useState([]);

    const queryApi = async () => {
        const queryClients = await axiosClient.get('/api/clients/client');
        setClients(queryClients.data)
        console.log(queryClients)
}

useEffect(() => {
    queryApi();
},[]);

if(!clients.length) return <Spinner/>

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clients/new"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                New Client
            </Link>

            <ul className="listado-clientes">
                {clients.map(client => (
                    <Client
                    key={client._id}
                    client={client}/>
                ))}
            </ul>
        </Fragment>
    )
}
