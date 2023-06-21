import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export function Pacientes() {
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        initTable();
    }, []);

    function initTable() {
        axios.get("http://localhost:3001/pacientes")
            .then(res => {
                setPacientes(res.data);
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            });
    }

    function onDeletePaciente(paciente) {
        const del = window.confirm(`Tem certeza que deseja excluir o paciente ${paciente.nome}?`);
        if (del) {
            axios.delete(`http://localhost:3001/pacientes/${paciente.id}`)
                .then(res => {
                    toast.success(`Paciente ${paciente.nome} excluído com sucesso!`);
                    navigate("/pacientes");
                })
                .catch(err => {
                    toast.error(`Um erro aconteceu: ${err.message}`);
                });
        }
    }

    return (
        <>
            <Container className="mt-3 d-flex justify-content-between align-items-center">
                <h2>Pacientes</h2>
                <Button as={Link} to="/pacientes/novo" variant="primary">Adicionar</Button>
            </Container>
            <hr />
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>CPF</th>
                            <th>RG</th>
                            <th>Data de Nascimento</th>
                            <th>Endereço</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes === [] ?
                            <Container />
                            :
                            pacientes.map((paciente, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{paciente.nome}</td>
                                        <td>{paciente.email}</td>
                                        <td>{paciente.cpf}</td>
                                        <td>{paciente.rg}</td>
                                        <td>{paciente.dataNasc}</td>
                                        <td>{paciente.endereco}</td>
                                        <td>{paciente.telefone}</td>
                                        <td>
                                            <Button onClick={() => navigate(`/pacientes/editar/${paciente.id}`)}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button onClick={() => onDeletePaciente(paciente)}>
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
    )
}