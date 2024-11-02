import React from 'react';

const TextInput = ({ label, register, name, placeholder, required, validate, errors }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            className={`form-control ${errors?.[name] ? "input-error" : ""}`}
            type="text"
            placeholder={placeholder}
            {...register(name, { 
                required, 
                minLength: 3, 
                validate
            })}
        />
        {errors?.[name]?.type === 'required' && (
            <p className="error-message">{label} é obrigatório.</p>
        )}
        {errors?.[name]?.type === 'minLength' && (
            <p className="error-message">{label} deve ter pelo menos 3 caracteres.</p>
        )}
        {errors?.[name]?.type === 'validate' && (
            <p className="error-message">Entrada inválida.</p>
        )}
    </div>
);

export default TextInput;
