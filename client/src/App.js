import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [Nombre, setNombre] = useState("");
  const [Edad, setEdad] = useState(0);
  const [Pais, setPais] = useState("");
  const [Cargo, setCargo] = useState("");
  const [Años, setAños] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  const validateForm = () => {
    if (Nombre !== "" && Edad !== "" && Pais !== "" && Cargo !== "" && Años !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3001/employees")
      .then(response => {
        setEmployeeList(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error al obtener la lista de empleados:", error);
      });
  }, []);

  const add = () => {
    axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Edad: Edad,
      Pais: Pais,
      Cargo: Cargo,
      Años: Años,
    }).then(() => {
      const successAlert = document.createElement('div');
      successAlert.className = 'success-alert';
      successAlert.innerText = 'El empleado se ha registrado correctamente';
      document.body.appendChild(successAlert);

      setTimeout(() => {
        successAlert.remove();
      }, 3000); // Desaparece después de 3 segundos
    });
  }

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
    validateForm();
  }

  const handleEdadChange = (event) => {
    setEdad(event.target.value);
    validateForm();
  }

  const handlePaisChange = (event) => {
    setPais(event.target.value);
    validateForm();
  }

  const handleCargoChange = (event) => {
    setCargo(event.target.value);
    validateForm();
  }

  const handleAñosChange = (event) => {
    setAños(event.target.value);
    validateForm();
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Registro de Empleados</h1>
        <div className="form">
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            onChange={handleNombreChange}
            type="text"
          />
          <label htmlFor="edad">Edad:</label>
          <input
            id="edad"
            onChange={handleEdadChange}
            type="number"
          />
          <label htmlFor="pais">Pais:</label>
          <input
            id="pais"
            onChange={handlePaisChange}
            type="text"
          />
          <label htmlFor="cargo">Cargo:</label>
          <input
            id="cargo"
            onChange={handleCargoChange}
            type="text"
          />
          <label htmlFor="anos">Años:</label>
          <input
            id="anos"
            onChange={handleAñosChange}
            type="number"
          />
          <button onClick={add} disabled={!isFormValid}>Registrar</button>
        </div>
        <div className="employee-list">
          <h2>Lista de Empleados</h2>
          <ul>
            {employeeList.map(employee => (
              <li key={employee.id}>
                Nombre: {employee.Nombre}, Edad: {employee.Edad}, País: {employee.Pais}, Cargo: {employee.Cargo}, Años: {employee.Años}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
