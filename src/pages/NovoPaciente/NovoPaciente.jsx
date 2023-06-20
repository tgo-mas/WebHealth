
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoPaciente() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    function onSubmit(data) {
        axios.post("http://localhost:3001/pacientes", data)
            .then(res => {
                toast.success("Cliente cadastrado com sucesso!");
                navigate("/pacientes");
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            })
    }

    return (
        <>
            <h1 className="mt-3">Cadastrar Paciente</h1>
            <hr />
            <Form className="m-4 p-4" onSubmit={handleSubmit(onSubmit)}>
                <Form.Floating
                    className="m-3"
                >
                    <Form.Control
                        placeholder="Nome"
                        id="nome"
                        type="text"
                        className={errors.nome && "is-invalid"}
                        {...register("nome", { required: true })}
                    />
                    <label htmlFor="nome">Nome</label>
                    {errors.nome && <Form.Text className="invalid-feedback">O campo nome é obrigatório!</Form.Text>}
                </Form.Floating>
                <Form.Floating
                    className="m-3"
                >
                    <Form.Control
                        placeholder="E-mail"
                        type="email"
                        id="email"
                        className={errors.email && "is-invalid"}
                        {...register("email", { required: true })}
                    />
                    <label htmlFor="email">E-mail</label>
                    {errors.email && <Form.Text className="invalid-feedback">O campo e-mail é obrigatório!</Form.Text>}
                </Form.Floating>
                <Form.Floating
                    className="m-3"
                >
                    <Form.Control
                        placeholder="Telefone"
                        type="tel"
                        id="telefone"
                        className={errors.telefone && "is-invalid"}
                        {...register("telefone", { maxLength: 12 })}
                    />
                    <label htmlFor="telefone">Telefone</label>
                    {errors.telefone && <Form.Text className="invalid-feedback">{errors.telefone.message}</Form.Text>}
                </Form.Floating>
                <Form.Floating
                    className="m-3"
                >
                    <Form.Control
                        placeholder="Endereco"
                        type="text"
                        id="endereco"
                        className={errors.endereco && "is-invalid"}
                        {...register("endereco", { required: true })}
                    />
                    <label htmlFor="endereco">Endereço</label>
                    {errors.endereco && <Form.Text className="invalid-feedback">O campo endereço é obrigatório!</Form.Text>}
                </Form.Floating>
                <Form.Floating
                    className="m-3"
                >
                    <Form.Control
                        placeholder="CPF"
                        type="tel"
                        id="cpf"
                        className={errors.cpf && "is-invalid"}
                        {...register("cpf", { maxLength: 12 })}
                    />
                    <label htmlFor="cpf">CPF</label>
                    {errors.cpf && <Form.Text className="invalid-feedback">{errors.cpf.message}</Form.Text>}
                </Form.Floating>
                <Form.Floating
                    className="m-3"
                >
                    <Form.Control
                        placeholder="RG"
                        type="tel"
                        id="RG"
                        className={errors.rg && "is-invalid"}
                        {...register("rg", { maxLength: 10 })}
                    />
                    <label htmlFor="rg">RG</label>
                    {errors.rg && <Form.Text className="invalid-feedback">{errors.rg.message}</Form.Text>}
                </Form.Floating>
                <Form.Floating
                    className="m-3"
                >
                    <Form.Control
                        placeholder="Data de Nascimento"
                        type="date"
                        id="dataNasc"
                        className={errors.dataNasc && "is-invalid"}
                        {...register("dataNasc", { required: true })}
                    />
                    <label htmlFor="dataNasc">Data de Nascimento</label>
                    {errors.dataNasc && <Form.Text className="invalid-feedback">O campo data de nascimento é obrigatório!</Form.Text>}
                </Form.Floating>
                <div className="d-flex justify-content-end gap-3">
                    <Button type="reset" variant="danger">Limpar</Button>
                    <Button className="me-3" type="submit" variant="primary">Enviar</Button>
                </div>
            </Form>
        </>
    );
}