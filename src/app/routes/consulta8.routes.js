import { Router } from "express";
import { getConsulta8 } from "../controller/consulta8.controller.js";

const router = Router()

router.get("/consulta8", getConsulta8) 

export default router;
