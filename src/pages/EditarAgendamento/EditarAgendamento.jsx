import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditarAgendamento() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [medicos, setMedicos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const { id } = useParams();

    function handleError(err){
        toast.error(`Um erro aconteceu: ${err.message}`);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/medicos")
            .then(res => {
                setMedicos(res.data);
            })
            .catch(handleError);
        axios.get("http://localhost:3001/pacientes")
            .then(res => {
                setPacientes(res.data);
            })
            .catch(handleError);
        axios.get(`http://localhost:3001/agendamentos/${id}`)
            .then(res => {
                let agend = res.data;
                agend = {...agend, datetimeInic: res.data.datetimeInic.slice(0, -1), datetimeFim: res.data.datetimeFim.slice(0, -1)};
                reset(agend);
            })
            .catch(handleError);
    }, []);

    function onSubmit(data) {
        axios.put(`http://localhost:3001/agendamentos/${id}`, data)
            .then(res => {
                toast.success("Agendamento editado com sucesso!");
                navigate("/agendamentos");
            })
            .catch(handleError);
    }

    return (
        <>
            <h1 className="mt-3">Editar Agendamento</h1>
            <hr />
            <Form className="m-4 p-4" onSubmit={handleSubmit(onSubmit)}>
                <Form.Select
                    label="Médico"
                    id="medicoId"
                    defaultValue="0"
                    className={`m-3 ${errors.medicoId && "is-invalid"}`}
                    {...register("medicoId", { required: true })}>
                    <option value="0" disabled>Selecione um médico</option>
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
                    defaultValue="0"
                    className={`m-3 ${errors.pacienteId && "is-invalid"}`}
                    {...register("pacienteId", { required: true })}>
                    <option value="0" disabled>Selecione um paciente</option>
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
                <Form.Select
                    className="m-3"
                    {...register("status")}
                >
                    <option value="Pendente">Pendente</option>
                    <option value="Realizada">Realizada</option>
                    <option value="Cancelada">Cancelada</option>
                </Form.Select>
                <div className="d-flex justify-content-end gap-3">
                    <Button type="reset" variant="danger">Limpar</Button>
                    <Button className="me-3" type="submit" variant="primary">Enviar</Button>
                </div>
            </Form>
        </>
    );
}