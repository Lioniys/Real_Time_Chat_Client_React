import {$authHost} from "./index";


export const getChats = async () => {
    const response = await $authHost.get('api/v1/chats')
    return response.data
}

export const createChat = async (chatName, idUser) => {
    const response = await $authHost.post('api/v1/chats',
        {chat_name: chatName, id: idUser})
    return response.data
}

export const addUserInChat = async (id, idUser) => {
    const response = await $authHost.post('api/v1/chats' + id + '/', {id: idUser})
    return response.data
}

export const getUsers = async () => {
    const response = await $authHost.get('api/v1/users')
    return response.data
}