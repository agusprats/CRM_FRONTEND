import React from 'react';

function OrderDetail({order}) {

    const {client} = order;

    return(
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ORDER ID:{order._id}</p>
                <p className="nombre">Client: {client.lastname}, {client.name}  </p>

                <div className="articulos-pedido">
                    <p className="productos">Products Ordered: </p>
                    <ul>
                        {order.order.map(articulos => (
                            <li key={order._id+articulos.product._id}>
                                <p>{articulos.product.name} </p>
                                <p>Prize: ${articulos.product.cost} </p>
                                <p>Quantity: {articulos.quantity}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="total">Total: ${order.total} </p>

            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Delete Order
                </button>
            </div>
        </li>
    )
}

export default OrderDetail;