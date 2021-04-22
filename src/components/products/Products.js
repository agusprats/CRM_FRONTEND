import React, {useEffect, useState, Fragment}  from 'react';
import axiosClient from '../../config/axios';
import {Link} from 'react-router-dom';
import Product from './Product';
import Spinner from '../layout/Spinner';

function Products() {

    const [products, setProducts] = useState([]);

    const queryAPI = async () => {
        const queryProducts = await axiosClient.get('/api/products/product');
        setProducts(queryProducts.data)
            console.log(queryProducts)
    }

    useEffect(() => {
        queryAPI();
    },[]);


    if(!products.length) return <Spinner/>

    return (
        <Fragment>
            <h2>Products</h2>
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

export default Products
