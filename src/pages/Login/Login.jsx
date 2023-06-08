import "./Login.css"
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";


export function Login() {
    return (
        <>
            <Container className="p-3 pt-4">
                <h1><strong>WebHealth</strong></h1>
            </Container>
            <hr />
            <Container className="login-container">
                <h2 className="text-center p-4">Faça login na nossa plataforma!</h2>
                <Form>
                    <FloatingLabel
                        className="m-3"
                        label="E-mail"
                        controlId="email"
                    >
                        <Form.Control type="email" placeholder="E-mail" />
                    </FloatingLabel>
                    <FloatingLabel
                        className="m-3"
                        label="Senha"
                        controlId="password"
                    >
                        <Form.Control type="password" placeholder="Senha" />
                    </FloatingLabel>
                    <div className="d-flex justify-content-end">
                        <Button size="lg" className="m-3">Registrar-se</Button>
                        <Button size="lg" className="m-3">Entrar</Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}