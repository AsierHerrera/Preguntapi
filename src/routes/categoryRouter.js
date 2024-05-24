import {Router} from "express";

import categoryApiController from "../controllers/categories/categoryApiController.js";
import { isAuthenticated,isAdmin } from "../middlewares/authMiddleware.js";


const router  = Router();

//router.get("/",categoryApiController.getAll);
router.post("/",categoryApiController.create);
router.get('/search', categoryApiController.getByProperty);
router.get('/', categoryApiController.getAllCategories);
router.get("/categories/:category",categoryApiController.getByCategory);
router.put("/:id",isAdmin,categoryApiController.update);
router.delete("/:id",isAdmin,categoryApiController.remove);
router.get("/:id",categoryApiController.getById);
/* router.post("/:id/status",categoryApiController.changeStatus);
router.post("/:id/user",categoryApiController.addUser);
router.delete("/:id/user",categoryApiController.removeUser); */

export default router;