import { Router } from "express";
import { getCargartabtemp } from "../controller/cargartmp.controller.js";

const router = Router()

router.get("/cargartabtemp", getCargartabtemp) 

export default router;