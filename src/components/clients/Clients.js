import React, {useEffect, useState, Fragment, useContext} from 'react';
import axiosClient from '../../config/axios';
import {Link, withRouter} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Client from './Client';
import {CRMContext} from '../../context/CRMContext';

function Clients(props) {

const [clients, setClients] = useState([]);

const [auth, guardarAuth] = useContext(CRMContext);

useEffect(() => {
    if(auth.token !== ''){
    const queryApi = async () => {
        try{
            const queryClients = await axiosClient.get('/api/clients/client', {
                headers: {Authorization: `Bearer ${auth.token}`}
            });
            setClients(queryClients.data)

        }catch(error){
        //error authorization
        if(error.response.status = 500){
            props.history.push('/session')
            }
        }
    }
    queryApi();
    }else{
        props.history.push('/session')
    }},[]);

if(!auth.auth){
    props.history.push('/session')
}

if(!clients.length) return <Spinner/>

    return (
        <Fragment>
            <h2>CLIENTS</h2>

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
export default withRouter(Clients);

