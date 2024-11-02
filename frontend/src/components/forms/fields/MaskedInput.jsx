import React from 'react';
import InputMask from 'react-input-mask';

const MaskedInput = ({ label, mask, register, name, placeholder, required, errors }) => (
    <div className="form-group">
        <label>{label}</label>
        <InputMask
            mask={mask}
            className={`form-control ${errors?.[name] ? "input-error" : ""}`}
            type="text"
            placeholder={placeholder}
            {...register(name, { required })}
        />
        {errors?.[name]?.type === 'required' && <p className="error-message">{label} é obrigatório.</p>}
        {errors?.[name]?.type === 'validate' && <p className="error-message">Entrada inválida.</p>}
    </div>
);

export default MaskedInput;
