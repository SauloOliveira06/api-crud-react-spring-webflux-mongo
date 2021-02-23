import React from 'react';
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand to="/">App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/adicionar-usuario">Adicionar Usuário</Nav.Link>
                    <Nav.Link href="/listar-usuarios">Lista de Usuários</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}

export default Header;