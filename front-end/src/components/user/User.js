import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import './User.css';
import * as Yup from 'yup';
import axios from 'axios';
import {Button} from "react-bootstrap";

const initialValues = {
    id: '',
    nome: '',
    email: '',
    senha: '',
}

/* Validar campos */
const validationSchema = Yup.object({
    nome: Yup.string().required('O nome é obrigatório!'),
    email: Yup.string().required('O email é obrigatório!'),
    senha: Yup.string().required('A senha é obrigatório!')
})

const config = {
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
    }
}
const createUrl = "http://localhost:8080/api/create";

/* Cadastrar os usuarios de chernobil */
const User = () => {

    const onSubmit = async(user) => {
        await axios.post(createUrl, user, config)
            .then(response => {
                console.log("Dados salvo com sucesso!")
            })
            .catch(errors => {
                console.log(errors);
            })
    }

    return (
        <div className="add-usuario">
            <h2>Adicionar Usuário</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSumit={onSubmit}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="nome" className="float-left">Nome</label>
                        <Field type="text" className="form-control" name="nome" placeholder="Nome"></Field>
                    </div>
                    <ErrorMessage name="nome" component="div" className="error" />
                    <div className="form-group">
                        <label htmlFor="email" className="float-left">E-mail</label>
                        <Field type="email" className="form-control" name="email" placeholder="E-mail"></Field>
                    </div>
                    <ErrorMessage name="email" component="div" className="error"/>
                    <div className="form-group">
                        <label htmlFor="senha" className="float-left">Senha</label>
                        <Field type="password" className="form-control" name="senha" placeholder="Senha"></Field>
                        <ErrorMessage name="senha" component="div" className="error" />
                    </div>
                    <div>
                        <Button type="submit" className="btn btn-primary mr-3">Cadastrar</Button>
                        <Button type="reset" className="btn btn-secondary mr-3">Limpar</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default User;