import { Router } from "express";
import { loginUser, registerUser } from "../controller/user.controller";
import { checkUniqueEmail } from "../middleware/checkUniqueEmail.middleware";

const userRouter = Router();

userRouter.post("/register", checkUniqueEmail, registerUser);

userRouter.post("/login", loginUser);

export default userRouter;
