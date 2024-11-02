import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import image from '../assets/web_site_under_construction.png';

const ComingSoon = () => {
    return (
        <div className="default-background d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <img src={image} alt="Logo da Clínica Vitalis" className="img-fluid mb-3" style={{ maxWidth: '500px' }} />
                <p className="lead text-light">Mais novidades em breve...</p>
            </div>
        </div>
    );
};

export default ComingSoon;
