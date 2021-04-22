import React, {useState,useEffect, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import axiosClient from '../../config/axios';
import Swal from 'sweetalert2';


function UpdateClient(props) {
    const {id} = props.match.params;


    const[client, dataClient] = useState({
    lastname: '',
    name:'',
    company:'',
    mail:'',
    phone:''
    })


    const queryAPI = async () => {
        const queryClient = await axiosClient.get(`/api/clients/client/${id}`);
        dataClient(queryClient.data);
    }

    useEffect(() => {
    queryAPI();
    },[])

    const updateState = e => {
    dataClient({
    ...client,
    [e.target.name] : e.target.value
    })}

    const updateClient =e=> {
        e.preventDefault();

        axiosClient.put(`/api/clients/client/${client._id}`, client)
        .then(res => {
            if(res.data.code===11000){
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    showLoaderOnDeny: true,
                    text: 'Client already registered',
                })
                console.log("Mail already registered")
            }else{ 
                Swal.fire(
                    'Client updated',
                    'Updated correctly',
                    'success',
                )
            } 
            props.history.push('/');
        })
    }


const validateClient = () => {
    const{ lastname, name, company, mail, phone} = client;
    let valid = !lastname.length || !name.length || !company.length || !mail.length || !phone.length;
    return valid;
}

    return (
        <Fragment>
            <h2>Update Client</h2>
            <form
            onSubmit={updateClient}>
                <legend>Fill all the fields</legend>
                <div className="campo">
                    <label>Lastname:</label>
                    <input 
                    type="text" 
                    placeholder="Client Lastname" 
                    name="lastname"
                    onChange={updateState}
                    value={client.lastname}/>
                </div>

                <div className="campo">
                    <label>Name:</label>
                    <input 
                    type="text" 
                    placeholder="Client Name" 
                    name="name"
                    onChange={updateState}
                    value={client.name}/>
                </div>

                <div className="campo">
                    <label>Company:</label>
                    <input 
                    type="text" 
                    placeholder="Client Company" 
                    name="company"
                    onChange={updateState}
                    value={client.company}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                    type="email" 
                    placeholder="Client Email" 
                    name="mail"
                    onChange={updateState}
                    value={client.mail}/>
                </div>

                <div className="campo">
                    <label>Phone:</label>
                    <input 
                    type="phone" 
                    placeholder="Client Phone" 
                    name="phone"
                    onChange={updateState}
                    value={client.phone}/>
                </div>

                <div className="enviar">
                        <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Save Changes"
                        disabled={validateClient()}
                        />
                </div>
            </form>
        </Fragment>
    )
}

export default withRouter(UpdateClient)
