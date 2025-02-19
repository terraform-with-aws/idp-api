import { Router } from "express";
import {
  createEnvironment,
  deleteEnvironment,
  getEnvironments,
} from "../controller/environment.controller";

const environmentRouter = Router();

environmentRouter.get("/", getEnvironments);
environmentRouter.post("/", createEnvironment);
environmentRouter.delete("/:name", deleteEnvironment);

export default environmentRouter;
