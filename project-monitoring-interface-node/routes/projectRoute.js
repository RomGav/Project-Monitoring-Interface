import express from "express";
import {createProject, readProject, listProject, patchProject, deleteProject} from "../controllers/projectController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { onlyDevelopersAndManagers } from "../middlewares/developersAndManagersOnlyMiddleware.js";

const router = express.Router()
router.use(isAuthenticated)

router.post("/", createProject);
router.get("/", listProject);
router.get("/:projectId", readProject);
router.patch("/:projectId", patchProject);
router.delete("/:projectId", onlyDevelopersAndManagers, deleteProject);

export default router