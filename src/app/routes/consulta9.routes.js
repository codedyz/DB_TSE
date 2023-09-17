import { Router } from "express";
import { getConsulta9 } from "../controller/consulta9.controller.js";

const router = Router()

router.get("/consulta9", getConsulta9) 

export default router;