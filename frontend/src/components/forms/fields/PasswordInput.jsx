import React from 'react';

const PasswordInput = ({ label, register, name, placeholder, required, validate, errors }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            className={`form-control ${errors?.[name] ? "input-error" : ""}`}
            type="password"
            placeholder={placeholder}
            {...register(name, { 
                required, 
                minLength: 5, 
                validate
            })}
        />
        {errors?.[name]?.type === 'required' && (
            <p className="error-message">{label} é obrigatório.</p>
        )}
        {errors?.[name]?.type === 'minLength' && (
            <p className="error-message">{label} deve ter pelo menos 5 caracteres.</p>
        )}
        {errors?.[name]?.type === 'validate' && (
            <p className="error-message">As senhas não coincidem.</p>
        )}
    </div>
);

export default PasswordInput;
