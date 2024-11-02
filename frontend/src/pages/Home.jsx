import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_vitalis.png';
import LeafletMap from '../components/map/LeafletMap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="default-background py-5">
                
                <div className="text-center mt-5">
                    <h2 className="display-4 text-title">Clínica Vitalis</h2>
                    <img 
                        src={logo} 
                        alt="Logo da Clínica Vitalis" 
                        className="img-fluid mb-3" 
                        style={{ maxWidth: '200px'}} 
                        />
                    <p className="lead text-light">Cuidando da sua saúde com excelência!</p>
                </div>

                <section className="text-center mt-5">
                    <p className="text-light mb-4">Escolha uma opção abaixo para registrar novos pacientes ou enfermeiros em nossa clínica.</p>

                    <ButtonGroup>
                        <Button 
                            variant="primary" 
                            size="lg" 
                            style={{ minWidth: '250px' }}
                            onClick={() => navigate('/registerPatient')}
                        >
                            Registrar Pacientes
                        </Button>
                        <Button 
                            variant="secondary" 
                            size="lg" 
                            style={{ minWidth: '250px' }}
                            onClick={() => navigate('/comingSoon')}
                        >
                            Registrar Enfermeiros
                        </Button>
                    </ButtonGroup>
                </section>

                <div className="container map-container text-center mt-5">
                    <Card className="map-card">
                        <Card.Body>
                            <Card.Title className="text-center">Temos Pacientes Espalhados por todo Brasil</Card.Title>
                            <Card.Text className="text-center">Clique em um estado para ver detalhes</Card.Text>
                            <LeafletMap />
                        </Card.Body>
                    </Card>
                </div>

            </div>
        </>
    );
};

export default Home;
