import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [Nombre, setNombre] = useState("");
  const [Edad, setEdad] = useState(0);
  const [Pais, setPais] = useState("");
  const [Cargo, setCargo] = useState("");
  const [Años, setAños] = useState(0);

  const add = () => {
    axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Edad: Edad,
      Pais: Pais,
      Cargo: Cargo,
      Años: Años,
    }).then(() => {
      alert("El empleado se ha registrado correctamente");
    });
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Registro de Empleados</h1>
        <div className="form">
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            onChange={(event) => setNombre(event.target.value)}
            type="text"
          />
          <label htmlFor="edad">Edad:</label>
          <input
            id="edad"
            onChange={(event) => setEdad(event.target.value)}
            type="number"
          />
          <label htmlFor="pais">Pais:</label>
          <input
            id="pais"
            onChange={(event) => setPais(event.target.value)}
            type="text"
          />
          <label htmlFor="cargo">Cargo:</label>
          <input
            id="cargo"
            onChange={(event) => setCargo(event.target.value)}
            type="text"
          />
          <label htmlFor="anos">Años:</label>
          <input
            id="anos"
            onChange={(event) => setAños(event.target.value)}
            type="number"
          />
          <button onClick={add}>Registrar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
