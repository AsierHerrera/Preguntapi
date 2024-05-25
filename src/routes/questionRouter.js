import {Router} from "express";

import questionApiController from "../controllers/questions/questionApiController.js";
import { isAuthenticated,isAdmin } from "../middlewares/authMiddleware.js";

const router  = Router();

router.get("/",questionApiController.getAll);
router.put("/",isAdmin,questionApiController.globalUpdate);
router.get("/:id",questionApiController.getById);
router.post("/",isAuthenticated,questionApiController.create);
router.put("/:id",isAdmin,questionApiController.update);
router.delete("/:id",isAdmin,questionApiController.remove);
router.get('/search', questionApiController.getByProperty);
router.get('/categories', questionApiController.getAllCategories);
router.get("/categories/:category",questionApiController.getByCategory);
/* router.post("/:id/status",questionApiController.changeStatus);
router.post("/:id/user",questionApiController.addUser);
router.delete("/:id/user",questionApiController.removeUser); */

export default router;