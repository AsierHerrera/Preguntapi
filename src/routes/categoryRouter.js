import {Router} from "express";

import categoryApiController from "../controllers/categories/categoryApiController.js";


const router  = Router();

router.get("/",categoryApiController.getAll);
router.get("/:id",categoryApiController.getById);
router.post("/",categoryApiController.create);
router.put("/:id",categoryApiController.update);
router.delete("/:id",categoryApiController.remove);
router.get('/search', categoryApiController.getByProperty);
router.get('/categories', categoryApiController.getAllCategories);
router.get("/categories/:category",categoryApiController.getByCategory);
/* router.post("/:id/status",categoryApiController.changeStatus);
router.post("/:id/user",categoryApiController.addUser);
router.delete("/:id/user",categoryApiController.removeUser); */

export default router;