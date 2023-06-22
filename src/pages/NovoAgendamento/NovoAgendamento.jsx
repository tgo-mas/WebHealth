import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoAgendamento() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/medicos")
            .then(res => {
                setMedicos(res.data);
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            });
        axios.get("http://localhost:3001/pacientes")
            .then(res => {
                setPacientes(res.data);
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            });
    }, []);

    function onSubmit(data) {
        axios.post("http://localhost:3001/agendamentos", data)
            .then(res => {
                toast.success("Agendamento registrado com sucesso!");
                navigate("/agendamentos");
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            });
    }

    return (
        <>
            <h1 className="mt-3">Novo Agendamento</h1>
            <hr />
            <Form className="m-4 p-4" onSubmit={handleSubmit(onSubmit)}>
                <Form.Select
                    label="Médico"
                    id="medicoId"
                    className={`m-3 ${errors.medicoId && "is-invalid"}`}
                    {...register("medicoId", { required: true })}>
                    <option selected disabled>Selecione um médico</option>
                    {medicos === [] ? 
                        <></>
                    : medicos.map(medico => {
                        return (
                            <option value={medico.id} key={medico.id}>{medico.nome}</option>
                        );
                    })}
                </Form.Select>
                <Form.Select
                    id="pacienteId"
                    className={`m-3 ${errors.pacienteId && "is-invalid"}`}
                    {...register("pacienteId", { required: true })}>
                    <option selected disabled>Selecione um paciente</option>
                    {pacientes === [] ? 
                        <></>
                    : pacientes.map(paciente => {
                        return (
                            <option value={paciente.id} key={paciente.id}>{paciente.nome}</option>
                        );
                    })}
                </Form.Select>
                <Form.Floating
                    className="m-3"
                >
                    <Form.Control
                        placeholder="Início"
                        type="datetime-local"
                        id="datetimeInic"
                        className={errors.datetimeInic && "is-invalid"}
                        {...register("datetimeInic", { required: true })}
                    />
                    <label htmlFor="datetimeInic">Início</label>
                    {errors.datetimeInic && <Form.Text className="invalid-feedback">O campo início é obrigatório!</Form.Text>}
                </Form.Floating>
                <Form.Floating
                    className="m-3"
                >
                    <Form.Control
                        placeholder="Término"
                        type="datetime-local"
                        id="datetimeFim"
                        className={errors.datetimeFim && "is-invalid"}
                        {...register("datetimeFim", { required: true })}
                    />
                    <label htmlFor="datetimeFim">Término</label>
                    {errors.datetimeFim && <Form.Text className="invalid-feedback">O campo término é obrigatório!</Form.Text>}
                </Form.Floating>
                <Form.Floating
                    className="m-3"
                >
                    <Form.Control
                        placeholder="Observações"
                        type="text"
                        id="observacoes"
                        className={errors.observacoes && "is-invalid"}
                        {...register("observacoes")}
                    />
                    <label htmlFor="observacoes">Observações</label>
                    {errors.observacoes && <Form.Text className="invalid-feedback">{errors.observacoes.message}</Form.Text>}
                </Form.Floating>
                <div className="d-flex justify-content-end gap-3">
                    <Button type="reset" variant="danger">Limpar</Button>
                    <Button className="me-3" type="submit" variant="primary">Enviar</Button>
                </div>
            </Form>
        </>
    );
}