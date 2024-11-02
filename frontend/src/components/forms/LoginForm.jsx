import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from './fields/TextInput';
import MaskedInput from './fields/MaskedInput';
import PasswordInput from './fields/PasswordInput';
import { FiLoader } from "react-icons/fi";
import { api } from '../../lib/axios';

function PatientForm() {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);

        console.log(data);
        
        setIsLoading(false);
    };

    const closeMessage = () => {
        setMessage(null);
    };

    return (
        <div className="form">
            <h2 className="form-title">Faça seu Login</h2>

            {message && (
                <div className={`alert mt-3 alert-${messageType} alert-dismissible`} role="alert">
                    {message}
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={closeMessage} 
                        aria-label="Close"
                    ></button>
                </div>
            )}

            <MaskedInput
                label="CPF"
                mask="999.999.999-99"
                register={register}
                name="cpf"
                placeholder="Digite seu CPF"
                required
                errors={errors}
            />
            <PasswordInput
                label="Senha"
                register={register}
                name="password"
                placeholder="Senha"
                required
                errors={errors}
            />

            <button 
                type="button" 
                className="btn btn-custom" 
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
            >
                {isLoading ? <FiLoader className="animate-spin text-white" /> : 'Cadastrar Enfermeiro'}
            </button>
        </div>
    );
};

export default PatientForm;
