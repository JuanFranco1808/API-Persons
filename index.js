//Librerias externas
require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const moment = require('moment-timezone');


//Modulos internos/funciones importadas
const { readFile, writeFile } = require("./src/files");

//Variables globales
const app = express();
const FILE_NAME_DB1 = "./db/persons.JSON";
const FILE_NAME_DB2 = "./db/acess.JSON";
const PORT = process.env.PORT;
const APP_NAME = process.env.APP_NAME;

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Motor de plantillas EJS
app.set("views", "./src/views");
app.set("view engine", "ejs");

//Rutas API persons
app.get("/persons", (req, res) => {
  try {
    const data = readFile(FILE_NAME_DB2);
    const newDate = moment().tz("America/Bogota").format();
    console.log(chalk.bgRed(newDate));
    data.push(newDate);
    writeFile(FILE_NAME_DB2, data);
  } catch (error) {
    console.error(error);
  }
  const data = readFile(FILE_NAME_DB1);
  res.render("index", { persons: data, count: 1 });
  res.send(data);
});

//Puerto de enlace
app.listen(PORT, () => {
  console.log(
    chalk.green(`${APP_NAME} is running on http://localhost:${PORT}/persons`)
  );
});
