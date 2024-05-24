import express from "express";

import {home, agregar, estudiantes, estudianteRut, editar, eliminar} from "../controllers/controller.js"

const router = express.Router();

router.get("/", home);

router.post("/agregar", agregar);

router.get("/estudiantes", estudiantes);

router.get("/estudiante/:rut", estudianteRut);

router.get("/editar", editar);

router.get("/eliminar/:rut", eliminar);


export default router