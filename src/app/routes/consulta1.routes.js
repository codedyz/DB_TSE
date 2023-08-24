import { Router } from "express";
import { getConsulta1 } from "../controller/consulta1.controller.js";
const router = Router()

router.get("/consulta1", getConsulta1) 

export default router;
