import { useForm } from 'react-hook-form';
import validator from 'validator';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import { FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientForm = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const birthdate = watch("birthdate");

    const onSubmit = (data) => {
        console.log(data);
    };

    const CustomInput = ({ value, onClick }) => {
        return (
            <div className="input-group" onClick={onClick}>
                <input type="text" className="form-control" placeholder="Selecione sua data de nascimento" value={value} onClick={onClick} readOnly />
                <div className='input-group-append'>
                    <span className='input-group-text'>
                        <FaCalendarAlt />
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="app-container">
            <div className="form-group">
                <label>Nome</label>
                <input
                    className={`form-control ${errors?.name ? "input-error" : ""}`}
                    type="text"
                    placeholder="Digite seu nome"
                    {...register("name", { required: true })}
                />
                {errors?.name?.type === 'required' && <p className="error-message">Nome é obrigatório.</p>}
            </div>

            <div className="form-group">
                <label>CPF</label>
                <input
                    className={`form-control ${errors?.cpf ? "input-error" : ""}`}
                    type="text"
                    placeholder="Digite seu CPF"
                    {...register("cpf", { required: true })}
                />
                {errors?.cpf?.type === 'required' && <p className="error-message">CPF é obrigatório.</p>}
            </div>

            <div className="form-group">
                <label>Peso</label>
                <input
                    className="form-control"
                    type="number"
                    placeholder="Digite seu peso (em Kg)"
                    {...register("peso")}
                />
            </div>

            <div className="form-group">
                <label>Altura</label>
                <input
                    className="form-control"
                    type="number"
                    placeholder="Digite sua altura (em metros)"
                    {...register("altura")}
                />
            </div>

            <div className="form-group">
                <label>Data de Nascimento</label>
                <DatePicker
                    selected={birthdate}
                    onChange={(date) => setValue("birthdate", date)}
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
                        <option value="0">Selecione uma UF</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="other">Outra</option>
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
