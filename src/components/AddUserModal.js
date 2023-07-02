import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Modal, Stack} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {addUserInChat, getUsers} from "../http/chatAPI";


const AddUserModal = observer((
    {setShow, show, trigger, setShowAlert, setDataAlert, setTypeAlert}) => {
    const [dropdownName, setDropdownName] = useState('Выберите пользователя');
    const [userList, setUserList] = useState([]);
    const [selectUser, setSelectUser] = useState('');
    const {user} = useContext(Context);

    useEffect(() => {
        if (show) {
            getUsers().then(r => {
                setUserList(r);
                setDropdownName('Выберите пользователя');
                setSelectUser('');
            }).catch(e => console.log(e));
        }
    }, [show, trigger]);

    const add = () => {
        if (selectUser) {
            addUserInChat(selectUser).then(() => {
                setShow(false);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 1500);
            }).catch(e => {
                setShow(false);
                setTypeAlert('danger');
                setDataAlert('Не получилось добавить пользователя');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 1500);
                setTimeout(() => {
                    setTypeAlert('success');
                    setDataAlert('Пользователь добавлен');
                }, 1700);
                console.log(e);
            });
        }
    }

    return (
        <Modal onHide={() => setShow(false)} show={show} centered animation={true}>
            <div className="rounded-2" style={{background: "#9DB2BF"}}>
                <Modal.Body>
                    <Stack gap={3} className="align-items-center">
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
                            onClick={() => add()}
                        >Добавить</Button>
                    </Stack>
                </Modal.Body>
            </div>
        </Modal>
    );
});

export default AddUserModal;