import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
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
                            <li><a href="#home" className="footer-link">Início</a></li>
                            <li><a href="#servicos" className="footer-link">Serviços</a></li>
                            <li><a href="#sobre" className="footer-link">Sobre Nós</a></li>
                            <li><a href="#contato" className="footer-link">Contato</a></li>
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