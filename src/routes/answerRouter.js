import {Router} from "express";

import answerApiController from "../controllers/answers/answerApiController.js";


const router  = Router();

router.get("/",answerApiController.getAll);
router.get("/:id",answerApiController.getById);
router.post("/",answerApiController.create);
router.put("/:id",answerApiController.update);
router.delete("/:id",answerApiController.remove);
/* router.post("/:id/user",answerApiController.addUser);
router.delete("/:id/user",answerApiController.removeUser); */

export default router;