import React, {useContext} from 'react';
import {MAIN_ROUTE} from "../consts";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import  menu from "../assets/menu.svg"
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AuthModal from "./AuthModal";


const NavBar = observer(() => {
    const {chat} = useContext(Context);
    const {user} = useContext(Context);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <AuthModal/>
                <Nav className="ml-auto">
                    <Button
                        className="me-3 p-1"
                        variant="secondary"
                        onClick={() => chat.setChatListBool(!chat.chatListBool)}
                    ><Image height={30} width={40} src={menu}/></Button>
                    <Navbar.Brand href={MAIN_ROUTE}>Real Time Chat</Navbar.Brand>
                </Nav>
                <Nav className="ml-auto">
                    <Button className="ms-4" onClick={() => user.logOut()}>Вихід</Button>
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;