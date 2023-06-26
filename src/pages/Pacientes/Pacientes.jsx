import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button, Table, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export function Pacientes() {
    const navigate = useNavigate();
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        initTable();
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function openModal(paciente){
        setPaciente(paciente);
        handleShow();
    }

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
                            <th>Data de Nascimento</th>
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
                                        <td>{paciente.dataNasc}</td>
                                        <td>
                                            <Button variant="success" className="m-2" onClick={() => openModal(paciente)}>
                                                <i className="bi bi-journal-text"></i>
                                            </Button>
                                            <Button variant="warning" className="m-2" onClick={() => navigate(`/pacientes/editar/${paciente.id}`)}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button variant="danger" className="m-2" onClick={() => onDeletePaciente(paciente)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Mais detalhes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nome: {paciente.nome}</p>
                    <p>E-mail: {paciente.email}</p>
                    <p>Telefone: {paciente.telefone}</p>
                    <p>Endereço: {paciente.endereco}</p>
                    <p>CPF: {paciente.cpf}</p>
                    <p>RG: {paciente.rg}</p>
                    <p>Data de Nascimento: {paciente.dataNasc}</p>
                </Modal.Body>
            </Modal>
        </>
    );
}