import React from 'react';

function FormSearchProduct(props) {
    return(
            <form
                onSubmit={props.searchProduct}
            >
                <legend>Search Products & add Quantity</legend>
                <div className="campo">
                    <label>Products:</label>
                    <input 
                        type="text" 
                        placeholder="Product Name" 
                        name="products" 
                        onChange={props.readSearchData}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-azul btn-block"
                    value="Buscar Producto"
                />
            </form>
    )
}
export default FormSearchProduct;
