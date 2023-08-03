import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {

  const [Nombre,setNombre] = useState("")
  const [Edad,setEdad] = useState(0)
  const [Pais,setPais] = useState("")
  const [Cargo,setCargo] = useState("")
  const [Años,setAños] = useState(0)

  const add = () => {
    axios.post("http://localhost:3001/create",{
      Nombre:Nombre,
      Edad:Edad,
      Pais:Pais,
      Cargo:Cargo,
      Años:Años,
    }).then(() =>{
      alert("empleado registrado");
    });
  }


  return (
    <div className="App">
      <div className="datos">
      <label>Nombre:<input
      onChange={(event)=>{
        setNombre(event.target.value);
      }}
      type="text"/></label>
      <label>Edad:<input 
      onChange={(event)=>{
        setEdad(event.target.value);
      }}
      type="number"/></label>
      <label>Pais:<input
      onChange={(event)=>{
        setPais(event.target.value);
      }}
      type="text"/></label>
      <label>Cargo:<input
      onChange={(event)=>{
        setCargo(event.target.value);
      }}
      type="text"/></label>
      <label>Años:<input
      onChange={(event)=>{
        setAños(event.target.value);
      }}
      type="number"/></label>
       <button onClick={App}>Registrar</button>     
      </div>
    </div>
  );
}

export default App;
