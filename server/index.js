const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1320",
  database: "empleados_crud",
});

app.post("/create", (req, res) => {
  const { Nombre, Edad, Pais, Cargo, Años } = req.body;

  db.query(
    "INSERT INTO empleados(nombre,edad,pais,cargo,años) VALUES(?,?,?,?,?)",
    [Nombre, Edad, Pais, Cargo, Años],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al registrar el empleado");
      } else {
        res.send("Empleado registrado con éxito");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM empleados", (err, results) => {
    if (err) {
      console.error("Error al obtener la lista de empleados:", error);
      res.status(500).send("Error al obtener la lista de empleados");
    } else {
      res.json(results);
    }
  });
});

app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const { Nombre, Edad, Pais, Cargo, Años } = req.body;

  db.query(
    "UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,años=? WHERE id=?",
    [Nombre, Edad, Pais, Cargo, Años, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al actualizar el empleado");
      } else {
        res.send("Empleado actualizado con éxito");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM empleados WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar el empleado");
    } else {
      res.send("Empleado eliminado con éxito");
    }
  });
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
