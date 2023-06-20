import { Container, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Pacientes() {
    return (
        <>
            <Container className="mt-3 d-flex justify-content-between align-items-center">
                <h2>Pacientes</h2>
                <Button as={Link} to="/pacientes/novo" variant="primary">Adicionar</Button>
            </Container>
            <hr />
            <Container>
                <Table>

                </Table>
            </Container>
        </>
    )
}