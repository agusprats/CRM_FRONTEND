import React, {useEffect, useState, Fragment, useContext}  from 'react';
import axiosClient from '../../config/axios';
import {Link, withRouter} from 'react-router-dom';
import Product from './Product';
import Spinner from '../layout/Spinner';
import {CRMContext} from '../../context/CRMContext';

function Products(props) {

    const [products, setProducts] = useState([]);
    const [auth, guardarAuth] = useContext(CRMContext);

    useEffect(() => {
        if(auth.token !== ''){
        const queryAPI = async () => {
            try{
                const queryProducts = await axiosClient.get('/api/products/product', {
                    headers: {Authorization: `Bearer ${auth.token}`}
                    });
                    setProducts(queryProducts.data)
            }catch(error){
                //error authorization
                if(error.response.status = 500){
                    props.history.push('/session')
                    }
                }
        }
        queryAPI();
                }else{
                props.history.push('/session')
    }},[]);

    if(!auth.auth){
        props.history.push('/session')
    }


    if(!products.length) return <Spinner/>

    return (
        <Fragment>
            <h2>PRODUCTS</h2>
            <Link to={'/products/new'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                New Producto
            </Link>

            <ul className="listado-productos">
            {products.map(product => (
                    <Product
                    key={product._id}
                    product={product}/>
            ))}   
            </ul>
        </Fragment>
    )
}

export default withRouter(Products)
