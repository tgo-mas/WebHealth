import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Login } from "./pages/Login/Login";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { Pacientes } from './pages/Pacientes/Pacientes';
import { Home } from './pages/Home/Home';
import { NovoPaciente } from './pages/NovoPaciente/NovoPaciente';
import { EditarPaciente } from './pages/EditarPaciente/EditarPaciente';
import { Medicos } from './pages/Medicos/Medicos';
import { NovoMedico } from './pages/NovoMedico/NovoMedico';
import { EditarMedico } from './pages/EditarMedico/EditarMedico';
import { Agendamentos } from './pages/Agendamentos/Agendamentos';
import { NovoAgendamento } from './pages/NovoAgendamento/NovoAgendamento';

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
              <Route path="/" element={<Home />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/pacientes/novo" element={<NovoPaciente />} />
              <Route path="/pacientes/editar/:id" element={<EditarPaciente />} />
              <Route path="/medicos" element={<Medicos />} />
              <Route path="/medicos/novo" element={<NovoMedico />} />
              <Route path="/medicos/editar/:id" element={<EditarMedico />} />
              <Route path="/agendamentos" element={<Agendamentos />} />
              <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
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
