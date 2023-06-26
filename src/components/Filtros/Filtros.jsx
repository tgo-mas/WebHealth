import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export function Filtros({ initTable }) {
    const { register, handleSubmit, reset } = useForm();
    const [formFiltro, setFormFiltro] = useState(<></>);

    function onSubmit(data) {
        let url = '';
        if (data.data) {
            url = `http://localhost:3001/agendamentos?data=${data.data}`;
        } else if (data.status) {
            url = `http://localhost:3001/agendamentos?status=${data.status}`;

        } else if (data.medico) {
            url = `http://localhost:3001/agendamentos?medico=${data.medico}`;

        } else if (data.paciente) {
            url = `http://localhost:3001/agendamentos?paciente=${data.paciente}`;
        }
        reset();
        initTable(url);
    }

    function exibirCampoFiltro(e) {
        e.target.variant = 'primary';
        switch (e.target.innerHTML) {
            case 'Data':
                setFormFiltro(
                    <Form className="w-50 d-flex align-items-center justify-content-end gap-2" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Control placeholder="Data" type="date" {...register("data")} />
                        <Button size="sm" type="submit"><i className="bi bi-search"></i></Button>
                    </Form>
                );
                break;
            case 'Status':
                setFormFiltro(
                    <Form className="w-50 d-flex align-items-center justify-content-end gap-2" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Select placeholder="Status" {...register("status")}>
                            <option value="Pendente">Pendente</option>
                            <option value="Realizada">Realizada</option>
                            <option value="Cancelada">Cancelada</option>
                        </Form.Select>
                        <Button size="sm" type="submit"><i className="bi bi-search"></i></Button>
                    </Form>
                );
                break;
            default:
                const nameRegister = e.target.innerHTML === 'Médico' ? 'medico' : 'paciente';

                setFormFiltro(
                    <Form className="w-50 d-flex align-items-center justify-content-end gap-2" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Control placeholder={e.target.innerHTML} type="text" {...register(nameRegister)} />
                        <Button size="sm" type="submit"><i className="bi bi-search"></i></Button>
                    </Form>
                );
        }
    }

    return (
        <Container className="d-flex gap-3 p-3">
            <div className="d-flex gap-3 w-50">
                <h2>Filtrar por:</h2>
                <Button variant="secondary" onClick={exibirCampoFiltro} >Data</Button>
                <Button variant="secondary" onClick={exibirCampoFiltro} >Status</Button>
                <Button variant="secondary" onClick={exibirCampoFiltro} >Médico</Button>
                <Button variant="secondary" onClick={exibirCampoFiltro} >Paciente</Button>
            </div>
            {formFiltro}
        </Container>
    );

}