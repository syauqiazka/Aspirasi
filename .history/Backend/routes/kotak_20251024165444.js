import express from "express";
import { getSaran, addSaran, deleteSaran, editSaran } from "../controller/kotakcontroller.js";

const router = express.Router();

router.get("/saran", getSaran);
router.post("/saran", addSaran);
router.delete("/saran/:id" ,deleteSaran);
router.patch("/:id", editSaran);
export default router;
