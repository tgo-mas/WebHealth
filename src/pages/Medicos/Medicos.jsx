import axios from "axios";
import { useEffect, useState } from "react"
import { Container, Button, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";

export function Medicos(){

    const [ medicos, setMedicos ] = useState([]);
    
    useEffect(() => {
        initTable();
    }, []);

    function initTable(){
        axios.get("http://localhost:3001/medicos")
            .then(res => {
                setMedicos(res.data);
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            })
    }

    return (
        <>
            <Container className="mt-3 d-flex justify-content-between align-items-center">
                <h2>Médicos</h2>
            </Container>
            <hr />
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Especialidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicos === [] ?
                            <Container />
                            :
                            medicos.map((medico, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{medico.nome}</td>
                                        <td>{medico.email}</td>
                                        <td>{medico.telefone}</td>
                                        <td>{medico.especialidade}</td>
                                        <td>
                                            {/* <Button onClick={() => navigate(`/medicos/editar/${paciente.id}`)}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button onClick={() => onDeletePaciente(paciente)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button> */}
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