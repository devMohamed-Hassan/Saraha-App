import { Router } from "express";
import { getUserProfile } from "./user.service.js";
import { auth } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", auth(), getUserProfile);

export default router;
