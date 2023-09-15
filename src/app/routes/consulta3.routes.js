import { Router } from "express";
import { getConsulta3 } from "../controller/consulta3.controller.js";

const router = Router()

router.get("/consulta3", getConsulta3) 

export default router;