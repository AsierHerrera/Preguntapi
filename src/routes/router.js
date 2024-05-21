import {Router} from "express";

import userRouter from "./userRouter.js";
import answerRouter from "./answerRouter.js";
import questionRouter from "./questionRouter.js";

const router  =  Router();

router.get("/",(req,res)=>{
    res.json({data:"hello api"});
})
router.use("/users",userRouter);
router.use("/answers",answerRouter);
router.use("/questions",questionRouter);
export default router;