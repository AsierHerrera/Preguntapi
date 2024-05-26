import { Router } from "express";
import scoreApiController from "../controllers/scores/scoreApiController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/",scoreApiController.getAll);
router.post("/",scoreApiController.create);
router.get("/category/:category",scoreApiController.getBycategory);
router.put("/:id",scoreApiController.update);
router.delete("/:id",scoreApiController.remove);
router.get("/:id",scoreApiController.getById);

export default router;
