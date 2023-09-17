import { Router } from "express";
import { getConsulta6 } from "../controller/consulta6.controller.js";

const router = Router()

router.get("/consulta6", getConsulta6) 

export default router;