import React, {Fragment} from 'react'
import {Link} from 'react-router-dom';
import axiosClient from '../../config/axios';
import Swal from 'sweetalert2';

function Product({product}) {

    const deleteProduct = (idProduct) => {
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
                axiosClient.delete(`/api/products/product/${idProduct}`)
                    .then(res => {
                        if(res.status === 200){
                        Swal.fire(  
                            'Deleted!', 
                            res.data.message, 
                            'success'
                            );
                        }
                    });     
			    }
		    });
	};

    const {_id, name, cost, image} = product;
    return (
        <Fragment>
            <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{name}</p>
                        <p className="precio" style={{fontSize: "18px"}}>USD {cost}</p>
                    { image? (
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt="car"/>
                    ) : null}                   
                    </div>
                    <div className="acciones">
                        <Link to={`/products/update/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Update Product
                        </Link>

                        <button 
                        type="button" 
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => deleteProduct(_id)}>
                            <i className="fas fa-times"></i>
                            Delete Product
                        </button>
                    </div>
                </li> 
        </Fragment>
    )
}

export default Product;