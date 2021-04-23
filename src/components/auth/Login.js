import React, {useState, useContext} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import axiosClient from '../../config/axios';
import {CRMContext} from '../../context/CRMContext';

function Login(props) {

    const [auth, guardarAuth] = useContext(CRMContext);

    const[credentials, setCredentials] = useState({});

    const startSession = async e => {
        e.preventDefault();
        // autenticar al usuario
        try {
            const response = await axiosClient.post('/api/users/signin', credentials);

            // extraer el token y colocarlo en localstorage
            const { token } = response.data;
            localStorage.setItem('token', token);

            // colocarlo en el state
            guardarAuth({
                token, 
                auth: true
            })
            
            Swal.fire(
                'Login OK',
                'Session started',
                'success'
            )
            // redireccionar
            props.history.push('/');
        } catch (error) {
            console.log(error);

        if(error.response){
            Swal.fire({
                type: 'error',
                title: 'Error, try again',
                text: error.response.data.mensaje
            })
        }else{
            Swal.fire({
                type: 'error',
                title: 'Error, try again',
                text: 'There was a Mistake'
            })
        }
        }
    }
    

    const readData = (e) => {
    setCredentials({
        ...credentials,
        [e.target.name] : e.target.value
    })
}

    return (
        <div className="login">
            <h2 style={{color:"black"}}>RockIt CRM</h2>
            <h2 >Start Session</h2>
            <div className="contenedor-formulario">
                <form onSubmit={startSession}>
                    <div className="campo">
                        <label>Mail</label>
                        <input
                            type="text"
                            name="mail"
                            placeholder="Email"
                            required
                            onChange={readData}/>
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={readData}/>
                    </div>

                    <input type="submit" value="ENTER" className="btn btn-verde btn-block"/>
                </form>
            </div>
        </div>
    )
}

export default  withRouter(Login);


