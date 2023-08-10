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

// Obtener la lista de empleados
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM empleados", (err, results) => {
        if (err) {
            console.log(err);
        } else {
            const employeeListHTML = results.map(employee => `
                <li>
                    <strong>Nombre:</strong> ${employee.nombre}<br>
                    <strong>Edad:</strong> ${employee.edad}<br>
                    <strong>País:</strong> ${employee.pais}<br>
                    <strong>Cargo:</strong> ${employee.cargo}<br>
                    <strong>Años:</strong> ${employee.años}
                </li>
            `).join("");

            const finalHTML = `
                <div class="employee-list">
                    <h2>Lista de Empleados</h2>
                    <ul>
                        ${employeeListHTML}
                    </ul>
                </div>
            `;

            res.send(finalHTML);
        }
    });
});


app.listen(3001, () => {
    console.log("corriendo en el puerto 3001");
});
