import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal, Stack} from "react-bootstrap";
import {createChat, getUsers} from "../http/chatAPI";

const CreateChatModal = ({setShow, show}) => {
    const [text, setText] = useState('')
    const [dropdownName, setDropdownName] = useState('Выберите пользователя')
    const [userList, setUserList] = useState([])
    const [selectUser, setSelectUser] = useState('')

    useEffect(() => {
        getUsers().then(r => {
            console.log(r)
            setUserList(r)
            setDropdownName('Выберите пользователя')
            setSelectUser('')
        })
    }, [])

    const create = () => {
        createChat()

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
                                            setDropdownName(i.name)
                                            setSelectUser(i.id)
                                        }}
                                    >{i.name}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button className="w-75" variant="dark">Создать</Button>
                    </Stack>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default CreateChatModal;