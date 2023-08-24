import { Router } from "express";
import { getDate, getIndex } from '../controller/index.controller.js'

const router = Router()

router.get("/", getIndex)

router.get("/ping", getDate)

export default router