import express from "express";
import { getSaran, addSaran, deleteSaran, e } from "../controller/kotakcontroller.js";

const router = express.Router();

router.get("/saran", getSaran);
router.post("/saran", addSaran);
router.delete("/saran/:id" ,deleteSaran);

export default router;
