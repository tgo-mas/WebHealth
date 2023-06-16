import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Login } from "./pages/Login/Login";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
    })
  }, []);

  return (
    <>
      <AuthContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}>

            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthContext.Provider>
    </>
  );
}

export default App;
