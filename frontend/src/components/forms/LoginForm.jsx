import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const response = await api.post("/authenticate/login", {
                cpf: data.cpf,
                password: data.password,
            });

            if (response.status >= 200 && response.status < 300) {
                const { accessToken, username } = response.data;
            
                // Salva o token e o nome do usuário no localStorage
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("username", username);
                
                // Sucesso: define mensagem de sucesso e tipo
                setMessage("Login realizado com sucesso!");
                setMessageType("success");
                
                // Resetar o formulário
                reset({
                    cpf: '',
                    password: '',
                });
                
                navigate('/');
            } else {
                // Erro: define mensagem de erro e tipo
                setMessage(response.data.message || "Ocorreu um erro.");
                setMessageType("danger");
            }
        } catch (error) {
            // Exibe mensagem de erro do backend
            setMessage(error.response?.data || "Erro ao cadastrar paciente.");
            setMessageType("danger");
        } finally {
            setIsLoading(false);
        }
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
