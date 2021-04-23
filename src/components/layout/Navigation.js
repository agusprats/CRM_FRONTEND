import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CRMContext} from '../../context/CRMContext';


function Navigation() {

    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth)return null;

    return (
        
        <aside className="sidebar col-3">
            <h2>ADMIN MENU</h2>
                <nav className="navegacion">
                    <Link to="/" className="clientes">CLIENTS</Link>
                    <Link to="/products" className="productos">PRODUCTS</Link>
                    <Link to="/orders" className="pedidos">ORDERS</Link>
                </nav>
        </aside>
    )
}

export default Navigation
