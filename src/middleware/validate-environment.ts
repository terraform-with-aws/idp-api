import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateEnvironment = [
  body("environment")
    .trim()
    .notEmpty()
    .withMessage("Environment name is required")
    .isLength({ min: 3 })
    .withMessage("Environment name must be at least 3 characters long"),
  body("stack")
    .trim()
    .notEmpty()
    .withMessage("Stack type is required"),
  body("config")
    .optional()
    .isObject(),
];

export const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
