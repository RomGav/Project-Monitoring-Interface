import express from "express";
import {createAcm, readAcm, listAcm, patchAcm, deleteAcm} from "../controllers/acmController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { onlyDevelopersAndManagers } from "../middlewares/developersAndManagersOnlyMiddleware.js";

const router = express.Router()
router.use(isAuthenticated)

router.post("/", createAcm);
router.get("/", listAcm);
router.get("/:accountManagerId", readAcm);
router.patch("/:accountManagerId", patchAcm);
router.delete("/:accountManagerId", onlyDevelopersAndManagers, deleteAcm);

export default router