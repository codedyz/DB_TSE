import { Router } from "express";
import { getConsulta10 } from "../controller/consulta10.controller.js";

const router = Router()

router.get("/consulta10", getConsulta10) 

export default router;