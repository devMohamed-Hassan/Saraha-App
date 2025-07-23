import { Router } from "express";
import * as authServices from "./auth.service.js";

const router = Router();

router.post("/signup", authServices.signUp);
router.post("/login", authServices.login);

export default router;
