import React from 'react';

const SelectInput = ({ label, options, register, name, errors, validate }) => (
    <div className="form-group">
        <label>{label}</label>
        <select className={`form-control ${errors?.[name] ? "input-error" : ""}`} {...register(name, { validate })}>
            <option value="0">Selecione uma opção...</option>
            {options.map((option) => (
                <option key={option.id} value={option.sigla}>{option.nome}</option>
            ))}
        </select>
        {errors?.[name] && <p className="error-message">{label} é obrigatório.</p>}
    </div>
);

export default SelectInput;
