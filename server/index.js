const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path"); // Agrega esta línea

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "scr"))); // Agrega esta línea

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1320",
    database: "empleados_crud"
});

app.post("/create", (req, res) => {
    const Nombre = req.body.Nombre;
    const Edad = req.body.Edad;
    const Pais = req.body.Pais;
    const Cargo = req.body.Cargo;
    const Años = req.body.Años;

    db.query(
        "INSERT INTO empleados(nombre,edad,pais,cargo,años) VALUES(?,?,?,?,?)",
        [Nombre, Edad, Pais, Cargo, Años],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("empleado registrado con exito");
            }
        }
    );
});

// Endpoint para obtener la lista de empleados
app.get('/employees', async (req, res) => {
    try {
      const [results] = await db.promise().query("SELECT * FROM empleados");
      res.json(results);
    } catch (error) {
      console.error("Error al obtener la lista de empleados:", error);
      res.status(500).send("Error al obtener la lista de empleados");
    }
  });

app.listen(3001, () => {
    console.log("corriendo en el puerto 3001");
});
