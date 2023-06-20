import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export function Pacientes() {

    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/pacientes")
            .then(res => {
                setPacientes(res.data);
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            });
    }, []);

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
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}