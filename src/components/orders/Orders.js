import React, {useEffect, useState, Fragment} from 'react';
import axiosClient from '../../config/axios';
import OrderDetail from './OrderDetail';

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            // obtener los pedidos
            const resultado = await axiosClient.get('/api/orders/order');
            setOrders(resultado.data);
        }
        consultarAPI();
    }, []);

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
export default Orders;
