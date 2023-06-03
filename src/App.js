import React from 'react';
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/NavBar";


function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
