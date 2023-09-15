import { Router } from "express";
import { getConsulta4 } from "../controller/consulta4.controller.js";

const router = Router()

router.get("/consulta4", getConsulta4) 

export default router;