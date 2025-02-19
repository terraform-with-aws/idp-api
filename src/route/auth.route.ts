import express from "express";
import { me, signIn, signUp } from "../controller/auth.controller";
import passport from '../config/passport'

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", passport.authenticate("jwt", {session: false}), me);

export default router;
