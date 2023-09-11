import { Router } from "express";
import {taskController} from '../../controllers/taskController.js';

const router = Router();

router.get("/", taskController.getAll);
router.get("/:id", taskController.get);
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);

export default router;