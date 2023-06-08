import "./Cadastro.css"
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";


export function Cadastro() {
    return (
        <>
            <Container className="p-3 pt-4">
                <h1><strong>WebHealth</strong></h1>
            </Container>
            <hr />
            <Container className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center p-4">Faça seu cadastro na nossa plataforma!</h2>
                <Form>
                    <FloatingLabel
                        className="m-3 input"
                        label="Nome"
                        controlId="nome"
                    >
                        <Form.Control type="text" placeholder="Nome" />
                    </FloatingLabel>
                    <FloatingLabel
                        className="m-3 input"
                        label="E-mail"
                        controlId="email"
                    >
                        <Form.Control type="email" placeholder="E-mail" />
                    </FloatingLabel>
                    <FloatingLabel
                        className="m-3 input"
                        label="Senha"
                        controlId="password"
                    >
                        <Form.Control type="password" placeholder="Senha" />
                    </FloatingLabel>
                    <div className="d-flex justify-content-end">
                        <Button size="lg" className="m-3">Cadastrar-se</Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}