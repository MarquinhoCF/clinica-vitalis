import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Footer.css';

const Footer = () => {
    const navigate = useNavigate();

    function handleNavigation(endpoint) {
        if (endpoint) {
            navigate(endpoint);
        } else {
            navigate('/comingSoon');
        }
    }

    return (
        <footer className="footer text-white bg-dark py-4 mt-auto">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="footer-title">Sobre a Clínica</h5>
                        <p>Na Clínica Vitalis, cuidamos da sua saúde com excelência e comprometimento.</p>
                    </div>
                    <div className="col-md-4">
                        <h5 className="footer-title">Links Úteis</h5>
                        <ul className="list-unstyled">
                            <li>
                                <button onClick={() => handleNavigation('/')} className="footer-link btn btn-link text-decoration-none">Início</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation()} className="footer-link btn btn-link text-decoration-none">Serviços</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation()} className="footer-link btn btn-link text-decoration-none">Sobre Nós</button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation()} className="footer-link btn btn-link text-decoration-none">Contato</button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5 className="footer-title">Contato</h5>
                        <p>Email: contato@clinicavitalis.com</p>
                        <p>Telefone: (35) 1234-5678</p>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; {new Date().getFullYear()} Clínica Vitalis. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
