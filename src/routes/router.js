import {Router} from "express";
import userRouter from "./userRouter.js";
import questionRouter from "./questionRouter.js";
import categoryRouter from "./categoryRouter.js";
import authRouter from "./authRouter.js";
import { isAuthenticated,isAdmin } from "../middlewares/authMiddleware.js";

const router  =  Router();

router.get("/",(req,res)=>{
    res.json({data:"hello api"});
})
router.use("/users",userRouter);
router.use("/questions",questionRouter);
router.use("/categories",categoryRouter);
router.use("/",authRouter);

export default router;