import express from "express";
import cookieParser from 'cookie-parser';
//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as authentication} from "./controllers/authentication.controller.js"
import {methods as authorization} from "./middlewares/authorization.js";

//Server
const app = express();
const PORT = process.env.PORT || 4000; // Fallback a 4000 solo para desarrollo local
app.listen(PORT);
console.log("Servidor corriendo en puerto ", PORT);

//Configuracion
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser())

//Rutas
app.get('/', authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/login.html"));
app.get('/register', authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/register.html"));
app.get('/admin', authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/login",authentication.login);
app.post("/api/register",authentication.register);
