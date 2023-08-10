import { body } from "express-validator";

export const CreateValidation = [
    body('first_name').isString().notEmpty().trim(),
    body('last_name').isString().notEmpty().trim(),
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