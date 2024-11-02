import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from './fields/TextInput';
import MaskedInput from './fields/MaskedInput';
import NumberInput from './fields/NumberInput';
import SelectInput from './fields/SelectInput';
import DateInput from './fields/DateInput';
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

    return (
        <div className="form">
            <h2 className="form-title">Cadastro de Paciente</h2>
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
            />
            <button type="button" className="btn btn-custom" onClick={handleSubmit(onSubmit)}>Cadastrar Paciente</button>
        </div>
    );
};

export default PatientForm;
