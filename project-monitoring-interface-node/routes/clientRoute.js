import express from "express";
import {createClient, readClient, listClient, patchClient, deleteClient} from "../controllers/clientController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { onlyDevelopersAndManagers } from "../middlewares/developersAndManagersOnlyMiddleware.js";

const router = express.Router()
router.use(isAuthenticated)

router.post("/", createClient);
router.get("/", listClient);
router.get("/:clientId", readClient);
router.patch("/:clientId", patchClient);
router.delete("/:clientId", onlyDevelopersAndManagers, deleteClient);

export default router