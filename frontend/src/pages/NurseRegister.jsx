import React from 'react';
import NurseForm from '../components/forms/NurseForm';
import '../styles/PatientRegister.css';

const PatientRegister = () => {
    return (
        <>
            <div className="form-container">
                <NurseForm />
            </div>
        </>
    );
};

export default PatientRegister;