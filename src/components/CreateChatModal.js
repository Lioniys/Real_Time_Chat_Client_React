import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal, Stack} from "react-bootstrap";
import {createChat, getUsers} from "../http/chatAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const CreateChatModal = observer((
    {setShow, show, trigger, setShowAlert, setDataAlert, setTypeAlert, chatListTrigger, setChatListTrigger}) => {
    const [text, setText] = useState('')
    const [dropdownName, setDropdownName] = useState('Выберите пользователя')
    const [userList, setUserList] = useState([])
    const [selectUser, setSelectUser] = useState('')
    const {user} = useContext(Context);

    useEffect(() => {
        if (show) {
            getUsers().then(r => {
                setUserList(r)
                setDropdownName('Выберите пользователя')
                setSelectUser('')
                setText('')
            }).catch(e => console.log(e))
        }
    }, [show, trigger])

    const create = () => {
        if (text && selectUser) {
            createChat(text, selectUser).then(() => {
                setShow(false)
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                    setChatListTrigger(!chatListTrigger)
                }, 1500)
            }).catch(e => {
                setShow(false)
                setTypeAlert('danger');
                setDataAlert('Не получитось создать чат');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 1500);
                setTimeout(() => {
                    setTypeAlert('success');
                    setDataAlert('чат создан');
                }, 1700);
                console.log(e)
            })
        }
    }

    return (
        <Modal onHide={() => setShow(false)} show={show} centered animation={true}>
            <div className="rounded-2" style={{background: "#9DB2BF"}}>
                <Modal.Body>
                    <Stack gap={3} className="align-items-center">
                        <Form.Control
                            className="w-75"
                            placeholder="Имя чата"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                        <Dropdown className="w-75">
                            <Dropdown.Toggle className="w-100" variant="secondary">{dropdownName}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {userList?.map(i =>
                                        <Dropdown.Item
                                            key={i.id}
                                            onClick={() => {
                                                if (i.id !== user.user.id) {
                                                    setDropdownName(i.name)
                                                    setSelectUser(i.id)
                                                }
                                            }}
                                        >{i.id === user.user.id ? '' : i.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            className="w-75"
                            variant="dark"
                            onClick={() => create()}
                        >Создать</Button>
                    </Stack>
                </Modal.Body>
            </div>
        </Modal>
    );
});

export default CreateChatModal;