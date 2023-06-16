import "./Cadastro.css"
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import { cadastroUsuario } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

export function Cadastro() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    function onSubmit(data) {
        cadastroUsuario(data)
            .then(res => {
                toast.success(`Usuário cadastrado: ${res.displayName}`);
            })
            .catch(err => {
                toast.error(`Erro no cadastro: ${err.message}`);
            });
    }

    return (
        <>
            <Container className="p-3 pt-4">
                <h1><strong>WebHealth</strong></h1>
            </Container>
            <hr />
            <Container className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center p-4">Faça seu cadastro na nossa plataforma!</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FloatingLabel
                        className="m-3 input"
                        label="Nome"
                        controlId="nome"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Nome"
                            className={errors.nome && "is-invalid"}
                            {...register("nome", { required: true })}
                        />
                        {errors.nome && <Form.Text className="invalid-feedback">O campo nome é obrigatório!</Form.Text>}
                    </FloatingLabel>
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
                        <Button size="lg" type="submit" className="m-3">Cadastrar-se</Button>
                    </div>
                </Form>
                <h4 className="text-center">Já tem uma conta? <Link to="/login">Fazer login</Link></h4>
            </Container>
        </>
    );
}