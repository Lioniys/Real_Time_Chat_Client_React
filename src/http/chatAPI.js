import {$authHost} from "./index";


export const getChats = async () => {
    const response = await $authHost.get('api/v1/chats')
    return response.data
}

export const getChat = async (chatId) => {
    const response = await $authHost.get('api/v1/chats/' + chatId)
    return response.data
}

export const createChat = async (chatName, userId) => {
    const response = await $authHost.post('api/v1/chats',
        {chat_name: chatName, second_user_id: userId})
    return response.data
}

export const addUserInChat = async (chatId, userId) => {
    const response = await $authHost.post('api/v1/chats/' + chatId, {id: userId})
    return response.data
}

export const getUsers = async () => {
    const response = await $authHost.get('api/v1/users')
    return response.data
}

export const getMessages = async (chatId) => {
    const response = await $authHost.get('api/v1/messages/' + chatId)
    return response.data
}