"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (method) => {
    try {
        return async (req, res, next) => {
            await method(req, res, next);
        };
    }
    catch (error) {
        console.log(error);
    }
};
exports.errorHandler = errorHandler;
