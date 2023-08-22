import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [Nombre, setNombre] = useState("");
  const [Edad, setEdad] = useState(0);
  const [Pais, setPais] = useState("");
  const [Cargo, setCargo] = useState("");
  const [Años, setAños] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [EmployeeList, setEmployeeList] = useState([]);
  const [Editar, setEditar] = useState(false);
  const [id, setId] = useState(0);

  const validateForm = () => {
    if (Nombre !== "" && Edad !== "" && Pais !== "" && Cargo !== "" && Años !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  const editarempleado = (val) => {
    setEditar(true);
    setNombre(val.Nombre);
    setEdad(val.Edad);
    setPais(val.Pais);
    setCargo(val.Cargo);
    setAños(val.Años);
    setId(val.id);
  }

  useEffect(() => {
    axios.get("http://200.7.138.110:3001/employees")
      .then(response => {
        setEmployeeList(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error al obtener la lista de empleados:", error);
      });
  }, []);

  const add = () => {
    const newEmployee = {
      Nombre: Nombre,
      Edad: Edad,
      Pais: Pais,
      Cargo: Cargo,
      Años: Años,
    };

    if (Editar) {
      axios.post(`http://200.7.138.110:3001/update/${id}`, newEmployee)
        .then(() => {
          // Realiza una nueva llamada para obtener la lista actualizada
          axios.get("http://200.7.138.110:3001/employees")
            .then(response => {
              setEmployeeList(response.data); // Actualiza la lista de empleados
              resetForm();
            })
            .catch(error => {
              console.error("Error al obtener la lista de empleados:", error);
            });
        });
    } else {
      axios.post("http://200.7.138.110:3001/create", newEmployee)
        .then(() => {
          // Realiza una nueva llamada para obtener la lista actualizada
          axios.get("http://200.7.138.110:3001/employees")
            .then(response => {
              setEmployeeList(response.data); // Actualiza la lista de empleados
              resetForm();
            })
            .catch(error => {
              console.error("Error al obtener la lista de empleados:", error);
            });
        });
    }
  }

  const resetForm = () => {
    setNombre("");
    setEdad(0);
    setPais("");
    setCargo("");
    setAños(0);
    setEditar(false);
    setId(0);
  };

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

  const eliminarEmpleado = (employeeId) => {
    axios.delete(`http://200.7.138.110:3001/delete/${employeeId}`)
      .then(() => {
        // Actualizar la lista de empleados después de eliminar
        const updatedEmployeeList = EmployeeList.filter((employee) => employee.id !== employeeId);
        setEmployeeList(updatedEmployeeList);
      })
      .catch(error => {
        console.error("Error al eliminar el empleado:", error);
      });
  }

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          <h1>Gestión de Empleados</h1>
        </div>
        <div className="card-body">
          <form>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input type="text" id="nombre" value={Nombre} onChange={handleNombreChange} className="form-control" placeholder="Ingrese un nombre" />
              </div>
              <div className="col">
                <label htmlFor="edad" className="form-label">Edad:</label>
                <input type="number" id="edad" value={Edad} onChange={handleEdadChange} className="form-control" placeholder="Ingrese su edad" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="pais" className="form-label">País:</label>
                <input type="text" id="pais" value={Pais} onChange={handlePaisChange} className="form-control" placeholder="Ingrese País" />
              </div>
              <div className="col">
                <label htmlFor="cargo" className="form-label">Cargo:</label>
                <input type="text" id="cargo" value={Cargo} onChange={handleCargoChange} className="form-control" placeholder="Ingrese el cargo" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="años" className="form-label">Años:</label>
                <input type="number" id="años" value={Años} onChange={handleAñosChange} className="form-control" placeholder="Ingrese Años de antigüedad" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                {Editar ? (
                  <div className="btn-group">
                    <button className="btn btn-warning btn-sm mr-2" onClick={add}>
                      Actualizar
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={resetForm}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-success" onClick={add} disabled={!isFormValid}>
                    Registrar
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
  {EmployeeList.map((val, key) => (
    <tr key={val.id}>
      <th>{val.id}</th>
      <td>{val.Nombre}</td>
      <td>{val.Edad}</td>
      <td>{val.Pais}</td>
      <td>{val.Cargo}</td>
      <td>{val.Años}</td>
      <td>
        <div className="btn-group button-group" role="group" aria-label="Acciones"> {/* Agregamos la clase .button-group aquí */}
          <button
            type="button"
            onClick={() => {
              editarempleado(val);
            }}
            className="btn btn-danger btn-sm"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => {
              eliminarEmpleado(val.id);
            }}
            className="btn btn-warning btn-sm"
          >
            Eliminar
          </button>
          <button type="button" className="btn btn-success btn-sm">
            SINUSO
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default App;
