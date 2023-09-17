import { Router } from "express";
import { getConsulta7 } from "../controller/consulta7.controller.js";

const router = Router()

router.get("/consulta7", getConsulta7) 

export default router;