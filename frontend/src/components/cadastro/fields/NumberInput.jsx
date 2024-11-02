import React from 'react';

const NumberInput = ({ label, register, name, placeholder, min, step, errors }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            className={`form-control ${errors?.[name] ? "input-error" : ""}`}
            type="number"
            placeholder={placeholder}
            {...register(name, { min, step })}
        />
        {errors?.[name] && <p className="error-message">Número inválido.</p>}
    </div>
);

export default NumberInput;
