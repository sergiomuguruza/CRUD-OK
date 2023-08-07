const express = require("express");
const app =express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1320",
    database: "empleados_crud"
});
app.post("/create",(req,res)=>{
    const Nombre = req.body.Nombre;
    const Edad = req.body.Edad;
    const Pais = req.body.Pais;
    const Cargo = req.body.Cargo;
    const Años = req.body.Años;

    db.query("INSERT INTO empleados(nombre,edad,pais,cargo,años) VALUES(?,?,?,?,?)", [Nombre,Edad,Pais,Cargo,Años],
    (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.send("empleado registrado con exito");
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")
})
