import React,{Fragment, useContext} from 'react';
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
import NewOrder from './components/orders/NewOrder';

import Login from './components/auth/Login';

import {CRMContext, CRMProvider} from './context/CRMContext'

function App() {

  const [auth, guardarAuth] = useContext(CRMContext);

  console.log(process.env.REACT_APP_BACKEND_URL);

  return (
  <Router>
    <Fragment>
      <CRMProvider value={[auth, guardarAuth]}>
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
            <Route exact path="/orders/new/:id" component={NewOrder}/>
            <Route exact path="/session" component={Login}/>
          </Switch>
          </main>
        </div>
        </CRMProvider>
      </Fragment>
    </Router>
  )
}

export default App

