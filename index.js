import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongo.js";
import Preguntas from './js/preguntas.js';

dotenv.config();
const CONTAINER_PORT = 3000;

const app = express();
connectDB();

app.get("/",(req,res)=>{
    res.json({message:"Hello World"});
})

app.listen(CONTAINER_PORT ,()=>{
    console.log("Aplicacion en marcha en el puerto "+ process.env.APP_PORT);
})

// Función para inicializar la aplicación
function inicializarPreguntapi() {
    const gestor = new Preguntas();
    gestor.obtenerInfo();
}

// Llama a la función para inicializar la aplicación cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', inicializarPreguntapi);
