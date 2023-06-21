import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

export function EditarMedico(){
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/medicos/${id}`)
            .then(res => {
                reset(res.data);
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            })
    }, [id, reset]);
    
    function onSubmit(data){
        axios.put(`http://localhost:3001/medicos/${id}`, data)
            .then(res => {
                toast.success("Médico editado com sucesso!");
                navigate("/medicos");
            })
            .catch(err => {
                toast.error(`Um erro aconteceu: ${err.message}`);
            });
    }

    return(
        <>
            <h1 className="mt-3">Editar Médico</h1>
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
                        placeholder="Especialidade"
                        type="text"
                        id="especialidade"
                        className={errors.especialidade && "is-invalid"}
                        {...register("especialidade", { maxLength: 12 })}
                    />
                    <label htmlFor="especialidade">Especialidade</label>
                    {errors.especialidade && <Form.Text className="invalid-feedback">{errors.especialidade.message}</Form.Text>}
                </Form.Floating>
                <div className="d-flex justify-content-end gap-3">
                    <Button type="reset" variant="danger">Limpar</Button>
                    <Button className="me-3" type="submit" variant="primary">Enviar</Button>
                </div>
            </Form>
        </>
    );


}