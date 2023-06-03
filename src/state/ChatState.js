import {makeAutoObservable} from "mobx";


export default class ChatState {

    constructor() {
        this._chatList = true
        makeAutoObservable(this)
    }

    setChatList(bool) {
        this._chatList = bool
    }

    get chatList() {
        return this._chatList
    }
}