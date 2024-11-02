import React from 'react';
import PatientForm from '../components/cadastro/PatientForm';
import '../styles/PatientRegister.css';

const PatientRegister = () => {
    return (
        <>
            <div className="form-container">
                <PatientForm />
            </div>
        </>
    );
};

export default PatientRegister;