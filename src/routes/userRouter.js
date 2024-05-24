import {Router} from "express";

import userApiController from "../controllers/users/userApiController.js";
import { isAuthenticated,isAdmin } from "../middlewares/authMiddleware.js";

const router  = Router();

router.get("/",isAdmin,userApiController.getAll);
router.get("/byproperty",isAdmin,userApiController.getByProperty);
router.get("/:id",isAdmin,userApiController.getById);
router.post("/",userApiController.create);
router.put("/:id",userApiController.update);
router.delete("/:id",isAdmin,userApiController.remove);

export default router;