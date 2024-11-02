import React from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import { ptBR } from 'date-fns/locale';
import InputMask from 'react-input-mask';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ label, selectedDate, onDateChange, placeholder, error }) => {
    const CustomInput = ({ value, onClick, onChange }) => (
        <div className="input-group" onClick={onClick}>
            <InputMask 
                type="text" 
                className={`form-control ${error ? "input-error" : ""}`} 
                placeholder={placeholder || "Selecione a data"} 
                mask="99/99/9999"
                value={value}
                onClick={onClick}
                onChange={onChange}
            />
            <div className="input-group-append">
                <span className="input-group-text">
                    <FaCalendarAlt />
                </span>
            </div>
        </div>
    );

    return (
        <div className="form-group">
            <label>{label}</label>
            <DatePicker
                selected={selectedDate}
                onChange={onDateChange}
                dateFormat="dd/MM/yyyy"
                locale={ptBR}
                customInput={<CustomInput />}
            />
        </div>
    );
};

export default DateInput;