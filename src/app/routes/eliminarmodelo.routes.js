import { Router } from "express";
import { getEliminarmodelo } from "../controller/eliminarmodelo.controller.js";

const router = Router()

router.get("/eliminarmodelo", getEliminarmodelo) 

export default router;