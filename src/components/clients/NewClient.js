import React, {useState, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import axiosClient from '../../config/axios';
import Swal from 'sweetalert2';

function NewClient({history}) {

const[client, setClient] = useState({
    lastname: '',
    name:'',
    company:'',
    mail:'',
    phone:''
})


const updateState = e => {
    setClient({
    ...client,
    [e.target.name] : e.target.value
})}


const handleSubmit = e => {
    e.preventDefault();

    axiosClient.post('/api/clients/client', client)
    .then(res => {
        if(res.data.code===11000){
            Swal.fire({
                type: 'error',
                title: 'Error',
                showLoaderOnDeny: true,
                text: 'User already registered',
            })
            console.log("Mail already registered")
        }else{ 
            Swal.fire(
                'New user added',
                res.data.mensaje,
                'success',
            )
        } 
        history.push('/')
    });
}


const validateClient = () => {
    const{ lastname, name, company, mail, phone} = client;
    let valid = !lastname.length || !name.length || !company.length || !mail.length || !phone.length;
    return valid;
}

    return (
        <Fragment>
            <h2>New Client</h2>
            <form
            onSubmit={handleSubmit}>
                <legend>Fill all the fields</legend>
                <div className="campo">
                    <label>Lastname:</label>
                    <input 
                    type="text" 
                    placeholder="Client Lastname" 
                    name="lastname"
                    onChange={updateState}/>
                </div>

                <div className="campo">
                    <label>Name:</label>
                    <input 
                    type="text" 
                    placeholder="Client Name" 
                    name="name"
                    onChange={updateState}/>
                </div>

                <div className="campo">
                    <label>Company:</label>
                    <input 
                    type="text" 
                    placeholder="Client Company" 
                    name="company"
                    onChange={updateState}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                    type="email" 
                    placeholder="Client Email" 
                    name="mail"
                    onChange={updateState}/>
                </div>

                <div className="campo">
                    <label>Phone:</label>
                    <input 
                    type="phone" 
                    placeholder="Client Phone" 
                    name="phone"
                    onChange={updateState}/>
                </div>

                <div className="enviar">
                        <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente"
                        disabled={validateClient()}
                        />
                </div>
            </form>
        </Fragment>
    )
}

export default withRouter(NewClient)
