"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const environment_controller_1 = require("../controller/environment.controller");
const environmentRouter = (0, express_1.Router)();
environmentRouter.get("/", environment_controller_1.getEnvironments);
environmentRouter.post("/", environment_controller_1.createEnvironment);
environmentRouter.delete("/:name", environment_controller_1.deleteEnvironment);
exports.default = environmentRouter;
