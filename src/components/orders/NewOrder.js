import React,{useState, useEffect, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import axiosClient from '../../config/axios';
import Swal from 'sweetalert2';

import FormSearchProduct from './FormSearchProduct';
import FormProductAmount from './FormProductAmount';

function NewOrder(props) {
        // extraer ID de cliente
        const { id } = props.match.params;

        const [client, setClient] = useState({});
        const [search, setSearch] = useState('');
        const [products, setProducts] = useState([]);
        const [total, setTotal] = useState(0);
    
        useEffect(() => {
            // obtener el cliente
            const queryAPI = async () => {
                // consultar el cliente actual
                const res = await axiosClient.get(`/api/clients/client/${id}`);
                setClient(res.data);
            }
            queryAPI();     
            // actualizar el total a pagar
            actualizarTotal();
        },[products]);
    
        const searchProduct = async e => {
            e.preventDefault();
            // obtener los productos de la busqueda
            const searchResult= await axiosClient.post(`/api/products/product/search/${search}`);
            // si no hay resultados una alerta, contrario agregarlo al state
            if(searchResult.data[0]) {
                let productResult = searchResult.data[0];
                // agregar la llave "producto" (copia de id)
                productResult.product = searchResult.data[0]._id;
                productResult.quantity = 0;
                // ponerlo en el state
                setProducts([...products, productResult]);
            } else {
                // no hay resultados
                Swal.fire({
                    type: 'error',
                    title: 'No Results',
                    text: 'No Results'
                })
            }
        }
        // almacenar una busqueda en el state
        const readSearchData = e => {
            setSearch( e.target.value );
        }
    
        // actualizar la cantidad de productos
        const minusProductsAmount = i => {
            // copiar el arreglo original de productos
            const allProducts = [...products];
            // validar si esta en 0 no puede ir mas alla
            if(allProducts[i].quantity === 0) return;
            // decremento
            allProducts[i].quantity--;
            // almacenarlo en el state
            setProducts(allProducts);
        }
    
        const addProducts = i => {
           // copiar el arreglo para no mutar el original
        const allProducts = [...products];
           // incremento
        allProducts[i].quantity++;
           // almacenarlo en el state
        setProducts(allProducts);
        }
    
        // Elimina Un producto del state 
        const deleteProductOrder = id => {
            const allProducts = products.filter(product => product.product !== id );
            setProducts(allProducts)
        }
    
        // Actualizar el total a pagar
        const actualizarTotal = () => {
            // si el arreglo de productos es igual 0: el total es 0
            if(products.length === 0) {
                setTotal(0);
                return;
            }
            // calcular el nuevo total
            let nuevoTotal = 0;
            // recorrer todos los productos, sus cantidades y precios
            products.map(product => nuevoTotal += (product.quantity * product.cost));
            // almacenar el Total
            setTotal(nuevoTotal);
        }
    
        // Almacena el pedido en la BD
        const makeOrder = async e => {
            e.preventDefault();
            // extraer el ID
            const { id } = props.match.params;
            // construir el objeto
            const order = {
                "client" : id, 
                "order" : products, 
                "total" : total
            }
            // almacenarlo en la BD
            const res = await axiosClient.post(`/api/orders/order/new/${id}`, order);
            // leer resultado
            if(res.status === 200) {
                // alerta de todo bien
                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    text: res.data.message
                })
            } else {
                // alerta de error
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Try again'
                })
            }
            // redireccionar
            props.history.push('/orders');
        }
    
        return(
            <Fragment>
                <h2>New Order</h2>
    
                    <div className="ficha-cliente">
                        <h3>Client Data</h3>
                        <p>Name: {client.lastname} {client.name}</p>
                        <p>Tel: {client.phone}</p>
                    </div>
    
                    <FormSearchProduct 
                        searchProduct={searchProduct}
                        readSearchData={readSearchData}
                    />
    
                    <ul className="resumen">
                        {products.map((product, index) => (
                            <FormProductAmount 
                                key={product.product}
                                product={product}
                                minusProductsAmount={minusProductsAmount}
                                addProducts={addProducts}
                                deleteProductOrder={deleteProductOrder}
                                index={index}
                            />
                        ))}
                    </ul>            
                    <p className="total">Total to pay: <span>$ {total}</span> </p>
                    { total > 0 ? (
                        <form onSubmit={makeOrder}>
                            <input type="submit"
                                className="btn btn-verde btn-block"
                                value="Realizar Pedido" />
                        </form>
                    ) : null }
        </Fragment>
    )
}

export default  withRouter(NewOrder);
