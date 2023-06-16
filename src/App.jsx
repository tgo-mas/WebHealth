import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Login } from "./pages/Login/Login";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>

          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
