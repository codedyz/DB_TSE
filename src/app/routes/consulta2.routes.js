import { Router } from "express";
import { getConsulta2 } from "../controller/consulta2.controller.js";

const router = Router()

router.get("/consulta2", getConsulta2) 

export default router;
