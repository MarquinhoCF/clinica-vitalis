import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import { FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PatientForm.css';

function PatientForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [ufs, setUfs] = useState([]);
    const [birthdate, setBirthdate] = useState(null);

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

    const onSubmit = (data) => {
        console.log(data);
    };

    const CustomInput = ({ value, onClick, onChange }) => {
        return (
            <div className="input-group" onClick={onClick}>
                <InputMask 
                    type="text" 
                    className="form-control" 
                    placeholder="Selecione sua data de nascimento" 
                    mask="99/99/9999"
                    value={value}
                    onClick={onClick}
                    onChange={onChange}
                />
                <div className='input-group-append'>
                    <span className='input-group-text'>
                        <FaCalendarAlt />
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="form">
            <h2 className="form-title">Cadastro de Paciente</h2>

            <div className="form-group">
                <label>Nome</label>
                <input
                    className={`form-control ${errors?.name ? "input-error" : ""}`}
                    type="text"
                    placeholder="Digite seu nome"
                    {...register("name", {
                        required: true,
                        validate: value => /^[\p{L} ]+$/u.test(value)
                    })}
                />
                {errors?.name?.type === 'required' && <p className="error-message">Nome é obrigatório.</p>}
                {errors?.name?.type === 'validate' && <p className="error-message">Nome inválido. Somente letras e espaços são permitidos.</p>}
            </div>

            <div className="form-group">
                <label>CPF</label>
                <InputMask
                    mask="999.999.999-99"
                    className={`form-control ${errors?.cpf ? "input-error" : ""}`}
                    type="text"
                    placeholder="Digite seu CPF"
                    {...register("cpf", { required: true })}
                />
                {errors?.cpf?.type === 'required' && <p className="error-message">CPF é obrigatório.</p>}
                {errors?.cpf?.type === 'validCPF' && <p className="error-message">CPF inválido.</p>}
            </div>

            <div className="form-group">
                <label>Peso</label>
                <input
                    className="form-control"
                    type="number"
                    placeholder="Digite seu peso (em Kg)"
                    {...register("weight")}
                    min="0"
                    step="0.01"
                />
            </div>

            <div className="form-group">
                <label>Altura</label>
                <input
                    className="form-control"
                    type="number"
                    placeholder="Digite sua altura (em metros)"
                    {...register("height")}
                    min="0"
                    step="0.01"
                />
            </div>

            <div className="form-group">
                <label>Data de Nascimento</label>
                <DatePicker
                    selected={birthdate}
                    onChange={(date) => {
                        setBirthdate(date);
                        setValue("birthdate", date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    locale={ptBR}
                    customInput={<CustomInput />}
                    className={`form-control ${errors?.birthdate ? "input-error" : ""}`}
                />
            </div>

            <div className="form-group">
                <label>Unidade Federativa</label>
                <div className="input-group">
                    <select
                        className={`form-control ${errors?.uf ? "input-error" : ""}`}
                        {...register("uf", { required: true, validate: (value) => value !== "0" || "Selecione uma UF" })}
                    >
                        <option value="0">Selecione uma UF...</option>
                        {ufs.map((uf) => (
                            <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
                        ))}
                    </select>
                    <div className="input-group-append">
                        <span className="input-group-text">
                            <FaChevronDown />
                        </span>
                    </div>
                </div>
                {errors?.uf?.type === 'validate' && <p className="error-message">Unidade Federativa é obrigatória.</p>}
            </div>

            <div className="form-group">
                <button type="button" className="btn btn-custom" onClick={handleSubmit(onSubmit)}>Cadastrar Paciente</button>
            </div>
        </div>
    );
};

export default PatientForm;
