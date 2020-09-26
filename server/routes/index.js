import { Router } from "express";
import ErrorHandler from "../middleware/errorHandler";
import FramerController from "../controller/framerController";
const router = new Router();

router.post("/upload", FramerController.generateFrame);

router.use(ErrorHandler);

export default router;