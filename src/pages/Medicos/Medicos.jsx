import axios from "axios";
import { useEffect, useState } from "react"
import { Container, Button, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export function Medicos(){
    const navigate = useNavigate();
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

    function onDeleteMedico(medico){
        const del = window.confirm(`Tem certeza que deseja excluir o médico ${medico.nome}?`);

        if(del){
            axios.delete(`http://localhost:3001/medicos/${medico.id}`)
                .then(res => {
                    toast.success(`Médico excluído com sucesso!`);
                    initTable();
                })
                .catch(err => {
                    toast.error(`Um erro aconteceu: ${err.message}`);
                });
        }
    }

    return (
        <>
            <Container className="mt-3 d-flex justify-content-between align-items-center">
                <h2>Médicos</h2>
                <Button as={Link} to="/medicos/novo" variant="primary">Adicionar</Button>
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
                                            <Button onClick={() => navigate(`/medicos/editar/${medico.id}`)}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button onClick={() => onDeleteMedico(medico)}>
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