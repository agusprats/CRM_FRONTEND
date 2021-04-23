import React, {useState, useEffect, Fragment} from 'react';
import axiosClient from '../../config/axios';
import {withRouter} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Swal from 'sweetalert2';

function UpdateProduct(props) {
    // obtener el ID
    const {id} = props.match.params;

    // producto = state, y funcion para actualizar
    const [ product, dataProduct ] = useState({
        name:'',
        cost:'',
        image:''
    });

    // FILE = state, SETFILE = setState
    const [file, setFile] = useState('');

    // cuando el componente carga
    // consultar la api para traer el producto a editar
    const queryAPI = async () => {
        const queryProduct = await axiosClient.get(`/api/products/product/${id}`);
        dataProduct(queryProduct.data);
    }
    useEffect(() => {
        queryAPI();
    },[])

     // leer los datos del formulario
    const readProductInfo = e => {
        dataProduct({
            // obtener una copia del state y agregar el nuevo
            ...product,
            [e.target.name] : e.target.value
        })
    }

    // coloca la imagen en el state
    const readFile = e => {
        setFile( e.target.files[0] );
    }

    // extraer los valores del state
    const { name, cost, image } = product;

    if(!name) return <Spinner />

    // Edita un Producto en la base de datos
    const updateProduct = async (e) => {
        e.preventDefault();
        // crear un formdata
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('cost', product.cost);
        formData.append('image', file);

        // almacenarlo en la BD
        try {
            const res = await axiosClient.put(`/api/products/product/${product._id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            // Lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
                    res.data.message,
                    'success'
                )
            }
            // redireccionar
            props.history.push('/products');
        } catch (error) {
            console.log(error);
            // lanzar alerta
            Swal.fire({
                type:'error',
                title: 'There was a Mistake',
                text: 'Try again'
            })
        }
    }

   

    return (
        <Fragment>
            <h2>Update Product</h2>

            <form onSubmit={updateProduct}>
                <legend>Complete the Products Fields</legend>
                <div className="campo">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="name"
                        onChange={readProductInfo}
                        value={product.name}
                    />
                </div>

                <div className="campo">
                    <label>Prize:</label>
                    <input 
                        type="number" 
                        name="cost" 
                        min="0.00" 
                        step="0.01" 
                        placeholder="Prize"
                        onChange={readProductInfo}
                        value={product.cost}
                    />
                </div>

                <div className="campo">
                    <label>Image:</label>
                    { image ? (
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt="cars" width="280"/>
                    ) : null }</div>
                    <div className="campo">
                    <input 
                        type="file"  
                        name="image"
                        onChange={readFile}
                    />
                    </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Update Product" />
                </div>
            </form>
        </Fragment>
    )
}
export default withRouter(UpdateProduct);

/*defaultValue={cost}*/