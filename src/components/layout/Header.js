import React, {useContext} from 'react';
import {CRMContext} from '../../context/CRMContext';
import { withRouter} from 'react-router-dom';

const Header = (props) =>{

    const [auth, guardarAuth] = useContext(CRMContext);

    const closeSession = () => {
        guardarAuth({
            token:'',
            auth: false
        });
        localStorage.setItem('token', '');

        props.history.push('/session')
    }

    return(
    <header className="barra">
        <div className="contenedor">
            <div className="contenido-barra">
                <h1>RockIT CRM</h1>

                {auth.auth ? (
                    <button 
                        type="button"
                        className="btn btn-rojo"
                        onClick={closeSession}>
                        <i className="far fa-times-circle"></i>
                        Close Session
                    </button>
                ) : null}
                
            </div>
        </div>
    </header>
    )
}

export default withRouter(Header);
