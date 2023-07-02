import {makeAutoObservable} from "mobx";


export default class ChatState {

    constructor() {
        this._chatListBool = true;
        this._chatList = [];
        this._selectChat = {};
        makeAutoObservable(this);
    }

    setChatListBool(bool) {
        this._chatListBool = bool;
    }

    get chatListBool() {
        return this._chatListBool;
    }

    setChatList(list) {
        this._chatList = list;
    }

    get chatList() {
        return this._chatList;
    }

    setSelectChat(chat) {
        this._selectChat = chat;
    }

    get selectChat() {
        return this._selectChat;
    }
}