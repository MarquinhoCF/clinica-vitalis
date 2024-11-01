import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = ({ logo }) => {
    return (
        <header className="header d-flex justify-content-between align-items-center p-3 mb-4 border-bottom">
            <div className="d-flex align-items-center">
                <img src={logo} alt="Logo" className="logo mr-3" style={{ width: '50px', height: '50px' }} />
                <div>
                    <h1 className="clinic-name mb-1" style={{ fontSize: '24px', fontWeight: 'bold' }}>Clínica Vitalis</h1>
                </div>
            </div>
            <nav>
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#home">Início</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#servicos">Serviços</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#sobre">Sobre Nós</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#contato">Contato</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;