import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from './fields/TextInput';
import MaskedInput from './fields/MaskedInput';
import NumberInput from './fields/NumberInput';
import SelectInput from './fields/SelectInput';
import DateInput from './fields/DateInput';
import { FiLoader } from "react-icons/fi";
import { api } from '../../lib/axios';

function PatientForm() {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [ufs, setUfs] = useState([]);
    const [birthdate, setBirthdate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    useEffect(() => {
        const fetchUfs = async () => {
            try {
                const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
                const data = await response.json();
                const sortedData = data.sort((a, b) => a.nome.localeCompare(b.nome));
                setUfs(sortedData);
            } catch (error) {
                console.error("Erro ao buscar UFs:", error);
            }
        };

        fetchUfs();
    }, []);

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const response = await api.post('/patient', data);

            if (response.status >= 200 && response.status < 300) {
                // Sucesso: define mensagem de sucesso e tipo
                setMessage(response.data.message || "Cadastro realizado com sucesso!");
                setMessageType("success");
                
                // Resetar o formulário
                reset({
                    name: '',
                    cpf: '',
                    weight: '',
                    height: '',
                    birthdate: null, // Reseta o campo de data para null
                    uf: '0' // Reseta a UF para "0"
                });
                setBirthdate(null); // Reseta o estado da data de nascimento
                
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
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
            <h2 className="form-title">Cadastro de Paciente</h2>

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

            <TextInput
                label="Nome"
                register={register}
                name="name"
                placeholder="Digite seu nome"
                required
                validate={value => /^[\p{L} ]+$/u.test(value)}
                errors={errors}
            />
            <MaskedInput
                label="CPF"
                mask="999.999.999-99"
                register={register}
                name="cpf"
                placeholder="Digite seu CPF"
                required
                errors={errors}
            />
            <NumberInput
                label="Peso"
                register={register}
                name="weight"
                placeholder="Digite seu peso (em Kg)"
                min="0"
                step="0.01"
                errors={errors}
            />
            <NumberInput
                label="Altura"
                register={register}
                name="height"
                placeholder="Digite sua altura (em metros)"
                min="0"
                step="0.01"
                errors={errors}
            />
            <DateInput
                label="Data de Nascimento"
                selectedDate={birthdate}
                onDateChange={(date) => {
                    setBirthdate(date);
                    setValue("birthdate", date);
                }}
                placeholder="Selecione sua data de nascimento"
                error={errors?.birthdate}
            />
            <SelectInput
                label="Unidade Federativa"
                options={ufs}
                register={register}
                name="uf"
                validate={value => value !== "0" || "Selecione uma UF"}
                errors={errors}
                defaultValue="0"
            />
            <button 
                type="button" 
                className="btn btn-custom" 
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
            >
                {isLoading ? <FiLoader className="animate-spin text-white" /> : 'Cadastrar Paciente'}
            </button>
        </div>
    );
};

export default PatientForm;
