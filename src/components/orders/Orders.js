import React, {useEffect, useState, Fragment, useContext} from 'react';
import axiosClient from '../../config/axios';
import {withRouter} from 'react-router-dom';
import OrderDetail from './OrderDetail';
import {CRMContext} from '../../context/CRMContext';

function Orders(props) {

    const [orders, setOrders] = useState([]);
    const [auth, guardarAuth] = useContext(CRMContext);

    useEffect(() => {
        if(auth.token !== ''){
        const consultarAPI = async () => {
            try{// obtener los pedidos
                const resultado = await axiosClient.get('/api/orders/order', {
                    headers: {Authorization: `Bearer ${auth.token}`}
                    });
                setOrders(resultado.data);
            }catch(error){
                //error authorization
                if(error.response.status = 500){
                    props.history.push('/session')
                    }
                }
        }
        consultarAPI();
    }else{
        props.history.push('/session')
    }}, []);

    if(!auth.auth){
        props.history.push('/session')
    }

    return (
        <Fragment>
            <h2>ORDERS</h2>

            <ul className="listado-pedidos">
                {orders.map(order => (
                    <OrderDetail 
                        key={order._id}
                        order={order}
                    />
                ))}
            </ul>
        </Fragment>
    )
}
export default withRouter(Orders);
