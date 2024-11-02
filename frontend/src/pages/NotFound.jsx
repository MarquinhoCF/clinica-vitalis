import React from 'react';

import notFoundImage from '../assets/not_found.png';

const NotFound = () => {
    return (
        <div className="default-background d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <img src={notFoundImage} alt="Página não encontrada" className="img-fluid mb-3" style={{ maxWidth: '500px' }} />
                <h1 className="text-light">404</h1>
                <p className="lead text-light">Página não encontrada</p>
                <p className="text-light">A página que você está procurando pode ter sido removida ou está temporariamente indisponível.</p>
            </div>
        </div>
    );
};

export default NotFound;
