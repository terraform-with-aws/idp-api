import { Router } from "express";
import {
  createEnvironment,
  deleteEnvironment,
  getEnvironments,
} from "../controller/environment.controller";
import passport from '../config/passport'
import { handleValidationErrors, validateEnvironment } from "../middleware/validate-environment";

const environmentRouter = Router();

environmentRouter.get("/", getEnvironments);
environmentRouter.post("/",passport.authenticate("jwt", {session: false}),validateEnvironment, handleValidationErrors, createEnvironment);
environmentRouter.delete("/:name",passport.authenticate("jwt", {session: false}), deleteEnvironment);

export default environmentRouter;
