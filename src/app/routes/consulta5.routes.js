import { Router } from "express";
import { getConsulta5 } from "../controller/consulta5.controller.js";

const router = Router()

router.get("/consulta5", getConsulta5) 

export default router;