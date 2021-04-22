import React, {useState, Fragment} from 'react';
import axiosClient from '../../config/axios';
import {withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';

function NewProduct(props) {

    const [product, setProduct] = useState({
        name:'',
        cost:''
    });

    const [file, setFile] = useState('');

    const addProduct = async e => {
        e.preventDefault();
        
        const formData = new FormData();
            formData.append('name', product.name);
            formData.append('cost', product.cost);
            formData.append('image', file);
        try{
            const res = await axiosClient.post('/api/products/product', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            if(res.status === 200){
                Swal.fire(
                    'Product Added',
                    res.data.message,
                    'success'
                )
            }
            props.history.push('/products')

        }catch(error){
            console.log(error);
                Swal.fire({
                type:'error',
                title:'Something went wrong',
                text:'Try again later'
                })
            }
    }

    const readProductInfo = e => {
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    const readFile = e => {
        setFile( e.target.files[0]);

    }

    return (
        <Fragment>
            <h2>NEW PRODUCT</h2>
            <form
            onSubmit={addProduct}>
                <legend style={{textalign: "center"}}>Complete the Fields</legend>

                <div className="campo">
                    <label>Name:</label>
                    <input 
                    type="text" 
                    placeholder="Product Name" 
                    name="name"
                    onChange={readProductInfo}/>
                </div>

                <div className="campo">
                    <label>Cost:</label>
                    <input 
                    type="number" 
                    name="cost" min="0.00" step="10" 
                    placeholder="Product Prize"
                    onChange={readProductInfo} />
                </div>
            
                <div className="campo">
                    <label>Image:</label>
                    <input 
                    type="file"  
                    name="image"
                    onChange={readFile} />
                </div>

                <div className="enviar">
                        <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Add new Product"/>
                </div>
            </form>
    </Fragment>
    )
}

export default withRouter(NewProduct);