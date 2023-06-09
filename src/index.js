import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ChatState from "./state/ChatState";
import UserState from "./state/UserState";
import {GoogleOAuthProvider} from "@react-oauth/google";


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <Context.Provider value={{chat: new ChatState(), user: new UserState()}}>
            <App />
        </Context.Provider>
    </GoogleOAuthProvider>
);
