import { body } from "express-validator";

export const CreateValidation = [
    body('firstName').isString().notEmpty().trim(),
    body('lastName').isString().notEmpty().trim(),
    body('email').isString().notEmpty().trim(),
    body('password').isString().notEmpty().trim(),
]

export const LoginValidation = [
    body('email').isString().notEmpty().trim(),
    body('password').isString().notEmpty().trim(),
]

export const SectionValidation = [
    body('name').isString().notEmpty().trim(),
]