"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const passport_1 = __importDefault(require("../config/passport"));
const router = express_1.default.Router();
// @ts-ignore
router.post("/signup", auth_controller_1.signUp);
// @ts-ignore
router.post("/signin", auth_controller_1.signIn);
// @ts-ignore
router.get("/me", passport_1.default.authenticate("jwt", { session: false }), auth_controller_1.me);
exports.default = router;
