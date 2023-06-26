import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Button, Container, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Filtros } from "../../components/Filtros/Filtros";

export function Agendamentos() {
    const navigate = useNavigate();
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        initTable();
    }, []);

    function getBadge(status){
        switch(status){
            case "Pendente":
                return(
                    <Badge bg="warning">{status}</Badge>
                );
            case "Realizada":
                return(
                    <Badge bg="success">{status}</Badge>
                );
            case "Cancelada":
                return(
                    <Badge bg="danger">{status}</Badge>
                );
            default:
                return;
        }
    }

    function initTable(url){
        if(!url){
            url = "http://localhost:3001/agendamentos"; 
        }
        console.log(url);
        axios.get(url)
            .then(res => {
                setAgendamentos(res.data);
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            });
    }

    function onDeleteAgendamento(agend){
        const del = window.confirm(`Tem certeza que deseja excluir este agendamento?`);

        if(del){
            axios.delete(`http://localhost:3001/agendamentos/${agend.id}`)
                .then(res => {
                    toast.success("Agendamento excluído com sucesso!");
                    initTable();
                })
                .catch(err => {
                    toast.error(`Erro ao excluir agendamento: ${err.message}`);
                });
        }
    }

    return (
        <>
            <Container className="mt-3 d-flex justify-content-between align-items-center">
                <h2>Agendamentos</h2>
                <Button as={Link} to="/agendamentos/novo" variant="primary">Adicionar</Button>
            </Container>
            <hr />
            <Filtros initTable={initTable} />
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>Médico</th>
                            <th>Paciente</th>
                            <th>Início</th>
                            <th>Término</th>
                            <th>Observações</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agendamentos === [] ?
                            <Container />
                            :
                            agendamentos.map((agendamento, index) => {
                                const inicFormatado = new Date(agendamento.datetimeInic);
                                const fimFormatado = new Date(agendamento.datetimeFim);

                                return (
                                    <tr key={index}>
                                        <td>{agendamento.medico.nome}</td>
                                        <td>{agendamento.paciente.nome}</td>
                                        <td>{inicFormatado.toLocaleString('pt-br')}</td>
                                        <td>{fimFormatado.toLocaleString('pt-br')}</td>
                                        <td>{agendamento.observacoes}</td>
                                        <td>{getBadge(agendamento.status)}</td>
                                        <td>
                                            <Button variant="warning" className="m-2" onClick={() => navigate(`/agendamentos/editar/${agendamento.id}`)}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button variant="danger" className="m-2" onClick={() => onDeleteAgendamento(agendamento)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}