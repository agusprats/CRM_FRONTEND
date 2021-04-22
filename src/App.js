import React,{Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

/*Layouts*/
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';

/*Components*/
import Clients from './components/clients/Clients';
import NewClient from './components/clients/NewClient';
import UpdateClient from './components/clients/UpdateClient';


import Products from './components/products/Products';
import NewProduct from './components/products/NewProduct';
import UpdateProduct from './components/products/UpdateProduct';


import Orders from './components/orders/Orders';

function App() {
  return (
    <Router>
      <Fragment>
        <Header/>

        <div className="grid contenedor contenido-principal">
          <Navigation/>
          <main className="caja-contenido col-9">
          <Switch>
            <Route exact path="/" component={Clients}/>
            <Route exact path="/clients/new" component={NewClient}/>
            <Route exact path="/clients/update/:id" component={UpdateClient}/>
            <Route exact path="/products" component={Products}/>
            <Route exact path="/products/new" component={NewProduct}/>
            <Route exact path="/products/update/:id" component={UpdateProduct}/>
            
            <Route exact path="/orders" component={Orders}/>
          </Switch>
          </main>
        </div>
      </Fragment>
    </Router>
  )
}

export default App

