import React from 'react'
import {Link} from 'react-router-dom';


function Navigation() {
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
