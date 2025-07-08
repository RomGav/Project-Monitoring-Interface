import express from "express";
import {createPm, readPm, listPm, patchPm, deletePm} from "../controllers/pmController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { onlyDevelopersAndManagers } from "../middlewares/developersAndManagersOnlyMiddleware.js";

const router = express.Router()
router.use(isAuthenticated)

router.post("/", createPm);
router.get("/", listPm);
router.get("/:projectManagerId", readPm);
router.patch("/:projectManagerId", patchPm);
router.delete("/:projectManagerId", onlyDevelopersAndManagers, deletePm);

export default router