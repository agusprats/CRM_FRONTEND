import React from 'react';

function FormProductAmount(props) {

    const {product, minusProductsAmount, addProducts, deleteProductOrder,  index } = props;

    return(
        <li>
            <div className="texto-producto">
                <p className="nombre">{product.name}</p>
                <p className="precio">$ {product.cost}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i 
                        className="fas fa-minus"
                        onClick={() => minusProductsAmount(index) }
                    ></i>

                    <p>{product.quantity}</p>

                    <i 
                        className="fas fa-plus"
                        onClick={() => addProducts(index) }
                    ></i>
                </div>
                <button 
                    type="button" 
                    className="btn btn-rojo"
                    onClick={() => deleteProductOrder(product._id)}
                >
                    <i className="fas fa-minus-circle"></i>
                        Delete Product
                </button>
            </div>
        </li>
    )
}

export default FormProductAmount;