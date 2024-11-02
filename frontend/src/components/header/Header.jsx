import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Header.css';

function Header({ logo }) {
    const navigate = useNavigate();

    function handleNavigation(endPoint) {
        if (endPoint != null) 
            navigate(endPoint);
        else
            navigate('/comingSoon');
    };

    return (
        <header className="header d-flex justify-content-between align-items-center p-3 mb-4 border-bottom">
            <div className="d-flex align-items-center">
                <button 
                    onClick={() => handleNavigation('/')} 
                    className="btn p-0 border-0 bg-transparent d-flex align-items-center"
                    aria-label="Home"
                >
                    <img src={logo} alt="Logo" className="logo mr-3" style={{ width: '50px', height: '50px' }} />
                    <h1 className="clinic-name mb-1 text-light" style={{ fontSize: '24px', fontWeight: 'bold' }}>Clínica Vitalis</h1>
                </button>
            </div>
            <nav>
                <ul className="nav">
                    <li className="nav-item">
                        <button className="nav-link btn btn-link text-decoration-none" onClick={() => handleNavigation('/')}>Início</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link text-decoration-none" onClick={() => handleNavigation()}>Serviços</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link text-decoration-none" onClick={() => handleNavigation()}>Sobre Nós</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link text-decoration-none" onClick={() => handleNavigation()}>Contato</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn btn-link text-light text-decoration-none" onClick={() => handleNavigation('/login')}>Fazer Login</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;