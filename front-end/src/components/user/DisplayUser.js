import React, {useEffect, useState} from 'react';
import {Button, Table} from "react-bootstrap";
import axios from 'axios';
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

const getUrl = "http://localhost:8080/api/users";
const deleteUser = "http://localhost:8080/api/delete/";
const updateUrl = "http://localhost:8080/api/user/";

const config = {
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
    }
}

/* Validar campos */
const validationSchema = Yup.object({
    nome: Yup.string().required('O nome é obrigatório!'),
    email: Yup.string().required('O email é obrigatório!'),
    senha: Yup.string().required('A senha é obrigatório!')
})

const initialValues = {
    id: '',
    nome: '',
    email: '',
    senha: '',
}

/* Listar os usuarios de chernobil na tela display */
const DisplayUser = () => {

    const [users, setUsers] = useState([]);

    const [editing, setEditing] = useState(false);

    const onSubmit = async(user) => {
        await axios.put(updateUrl, user, config)
            .then(response => {
                if(response.status === 200){
                    console.log("Dados Editados com sucesso!");
                    setTimeout(()=>{
                        setEditing(false);
                    }, 2000)
                }
            })
            .catch(errors => {
                console.log(errors);
                console.log("Erro ao Editar os dados!")
            })
    }

    useEffect( ()=>{
        axios.get(getUrl, config)
            .then(response =>{
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(errors => {
                console.log(errors);
            })
    }, [users]); /* dependencia para editar na tabela */

    /* DELETAR USUARIO */
    const handlerClick = (id) => {
        axios.delete(deleteUser+ id, config)
            .then(response => {
                if(response.status === 200){
                    console.log("usuario deletado!")
                }
            })
            .then(errors => {
                console.log(errors);
            })
    }
    /* EDITAR USUARIO */
    const editRow = (user) => {
        setEditing(true);
        initialValues.id = user.id;
        initialValues.nome = user.nome;
        initialValues.email = user.email;
        initialValues.senha = user.senha;
    }
    return (
        <div>
            {
                !editing ? ( /* se nao editar, mostra a tela normalmente  */
                    <div>
                        <h3>lista de Usuários</h3>

                        <Table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Senha</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.length > 0 ? ( /* total de usuarios de coca */
                                    users.map((user) =>{
                                        const {id, nome, email, senha } = user;

                                        return(
                                            <tr key={id.toString()}>
                                                <td>{nome}</td>
                                                <td>{email}</td>
                                                <td>{senha}</td>
                                                <td>
                                                    <Button className="btn btn-primary mr-3" onClick={()=> editRow(user)}>Editar</Button>
                                                    <Button className="btn btn-danger" onClick={()=> handlerClick(id)}>Deletar</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7">Nada encontrado</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                ) : ( /* chama a view de edicao */
                    <div className="add-usuario">
                        <h2>Editar Usuário</h2>
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
                                    <Button type="submit" className="btn btn-primary mr-3">Editar</Button>
                                    <Button type="reset" className="btn btn-secondary mr-3">Cancelar</Button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                )
            }
        </div>
    );
};

export default DisplayUser;