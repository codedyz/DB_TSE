import { Router } from "express";
import { getCrearmodelo } from "../controller/crearmodelo.controller.js";

const router = Router()

router.get("/crearmodelo", getCrearmodelo) 

export default router;