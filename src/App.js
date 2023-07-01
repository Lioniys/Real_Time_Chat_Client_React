import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/NavBar";
import jwtDecode from "jwt-decode";
import {check} from "./http/userAPI";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import {getChats} from "./http/chatAPI";


const App = observer(() => {
    const {chat} = useContext(Context);
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        check().then(data => {
            user.setIsAuth(data);
            const userId = jwtDecode(localStorage.getItem('access')).sub;
            user.setUser({id: userId});
            //  getChats().then(r => {
            //     console.log(r)
            //     chat.setChatList(r)
            //     // setChatList(r)
            // }).catch(e => console.log(e))
        }).catch(e => console.log(e)).finally(() => setLoading(false));
    }, [user]);

    if (loading) {
        return <Spinner className="position-absolute top-50 start-50"/>
    }

  return (
      <BrowserRouter>
          <Navbar/>
          <AppRouter/>
      </BrowserRouter>
  );
})

export default App;
