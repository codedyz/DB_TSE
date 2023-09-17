import { Router } from "express";
import { getConsulta11 } from "../controller/consulta11.controller.js";

const router = Router()

router.get("/consulta11", getConsulta11) 

export default router;