import {makeAutoObservable} from "mobx";


export default class ChatState {

    constructor() {
        this._chatListBool = true
        this._chatList = []
        makeAutoObservable(this)
    }

    setChatListBool(bool) {
        this._chatListBool = bool
    }

    get chatListBool() {
        return this._chatListBool
    }

    setChatList(list) {
        this._chatListBool = list
    }

    get chatList() {
        return this._chatList
    }
}