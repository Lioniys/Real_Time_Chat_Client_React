import React, {useContext, useState} from 'react';
import {Button, Form, Modal, Row} from "react-bootstrap";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {GoogleLogin} from "@react-oauth/google";
import jwtDecode from "jwt-decode";


const AuthModal = observer(() => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {user} = useContext(Context);


    const singIn = async () => {
        try {
            if (isLogin) {
                if(username && password) {
                    const userId = await login(username, password)
                    user.setUser({id: userId});
                    user.setIsAuth(true);
                    user.setShowAuth(false);
                }
            } else {
                if( password && email) {
                    const userId = await registration( password, email);
                    user.setUser({id: userId});
                    user.setIsAuth(true);
                    user.setShowAuth(false);
                }
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    const google = async (credentialResponse) => {
        const data = jwtDecode(credentialResponse.credential)
        try {
            if (isLogin) {
                const userId = await login(data.email, data.sub)
                user.setUser({id: userId});
                user.setIsAuth(true);
                user.setShowAuth(false);
            } else {
                const userId = await registration(data.sub, data.email);
                user.setUser({id: userId});
                user.setIsAuth(true);
                user.setShowAuth(false);
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Modal show={!user.isAuth} fullscreen={true} style={{background: '#526D82'}}>
            <Modal.Body style={{background: '#526D82'}} className="d-flex justify-content-center align-items-center">
                <div style={{background: '#9DB2BF', width: 400}} className="flex-column d-flex w-xs-50 rounded-4 p-4">
                    <h2 className="d-flex m-auto text-center">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form className="flex-column d-flex" validated={true}>
                        {isLogin ? '' :
                            <Form.Control
                                required
                                className="mt-3"
                                placeholder="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />}
                        <Form.Control
                            required
                            className="mt-3"
                            placeholder="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Form.Control
                            required
                            className="mt-3"
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            className="mt-3"
                            variant="secondary"
                            onClick={singIn}
                        >
                            {isLogin ? 'Войти' : 'Зарегестрироваться'}
                        </Button>
                        <div className="d-flex justify-content-center mt-3">
                            <GoogleLogin
                                useOneTap={true}
                                onSuccess={credentialResponse => google(credentialResponse)}
                                onError={() => console.log('Login Failed')}
                            />
                        </div>
                        <Row className="mt-3 pl-3 pr-3 d-flex justify-content-center text-center">
                            <div className="d-flex justify-content-center">
                                <div className="mt-2">{isLogin ? 'Нет аккаунта? ' : 'Есть аккаунт? '}</div>
                                <Button onClick={() => setIsLogin(!isLogin)} variant={"link"}>
                                    {isLogin ? 'Регистрация' : 'Авторизация'}
                                </Button>
                            </div>
                        </Row>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    );
});

export default AuthModal;