import {Router} from "express";

import questionApiController from "../controllers/questions/questionApiController.js";


const router  = Router();

router.get("/",questionApiController.getAll);
router.get("/:id",questionApiController.getById);
router.post("/",questionApiController.create);
router.put("/:id",questionApiController.update);
router.delete("/:id",questionApiController.remove);
/* router.post("/:id/status",questionApiController.changeStatus);
router.post("/:id/user",questionApiController.addUser);
router.delete("/:id/user",questionApiController.removeUser); */

export default router;