import { Container, NavDropdown, Navbar, Nav } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { desconectar } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { Button } from "bootstrap";

export function Menu() {
    const user = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    function handleLogout(){
        if(desconectar()){
            toast.success("Usuário desconectado com sucesso!");
            navigate("/login");
        }else{
            toast.error("Erro ao desconectar usuário!");
        }
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <Navbar.Brand>WebHealth</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-collapse" />
                    <Navbar.Collapse id="navbar-collapse" className="d-md-flex justify-content-end">
                        <Nav>
                            <NavDropdown
                                title={user && user.displayName}
                                menuVariant="light"
                                id="navDropdown"
                            >
                                <NavDropdown.Item>Meu perfil</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}