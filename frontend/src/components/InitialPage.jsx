import Header from './header/Header';
import Footer from './footer/Footer';
import logo from '../assets/logo_vitalis.png';
import PatientForm from "./cadastro/PatientForm";

const InitialPage = () => {
  return (
    <>  
        <Header logo={logo} />
        <PatientForm />
        <Footer />
    </>
  );
};

export default InitialPage;