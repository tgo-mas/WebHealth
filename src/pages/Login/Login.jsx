import { useForm } from "react-hook-form";
import "./Login.css"
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import { loginUsuario } from "../../firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    function onSubmit(data) {
        loginUsuario(data)
            .then(user => {
                toast.success(`Seja bem vindo(a), ${user.displayName}!`);
                navigate("/");
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            });
    }

    return (
        <>
            <Container className="p-3 pt-4">
                <h1><strong>WebHealth</strong></h1>
            </Container>
            <hr />
            <Container className="d-flex justify-content-center flex-column align-items-center" >
                <h2 className="text-center p-4">Faça login na nossa plataforma!</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FloatingLabel
                        className="m-3 input "
                        label="E-mail"
                        controlId="email"
                    >
                        <Form.Control
                            type="email"
                            placeholder="E-mail"
                            className={errors.email && "is-invalid"}
                            {...register("email", { required: true })}
                        />
                        {errors.email && <Form.Text className="invalid-feedback">O campo e-mail é obrigatório!</Form.Text>}
                    </FloatingLabel>
                    <FloatingLabel
                        className={"m-3 input " + (errors.senha && "is-invalid")}
                        label="Senha"
                        controlId="password"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Senha"
                            className={errors.senha && "is-invalid"}
                            {...register("senha", { required: true })}
                        />
                        {errors.senha && <Form.Text className="invalid-feedback">O campo senha é obrigatório!</Form.Text>}

                    </FloatingLabel>
                    <div className="d-flex justify-content-end">
                        <Button size="lg" as={Link} to="/cadastro" className="m-3">Cadastro</Button>
                        <Button size="lg" type="submit" className="m-3">Entrar</Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}