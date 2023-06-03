import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ChatState from "./state/ChatState";


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{chat: new ChatState()}}>
        <App />
    </Context.Provider>
);
