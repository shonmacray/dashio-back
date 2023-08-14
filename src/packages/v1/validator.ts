import { body } from "express-validator";

const VALIDATION = {
    CreateUser: [
        body('first_name').isString().notEmpty().trim(),
        body('last_name').isString().notEmpty().trim(),
        body('email').isString().notEmpty().trim(),
        body('password').isString().notEmpty().trim(),
    ],
    Login: [
        body('email').isString().notEmpty().trim(),
        body('password').isString().notEmpty().trim(),
    ],
    Section: [
        body('name').isString().notEmpty().trim(),
    ],
    Skill: [
        body('skill').isString().notEmpty().trim(),
    ],
    header: [
        body('contact').isString().notEmpty().trim(),
        body('city_country').isString().notEmpty().trim(),
        body('job_title').isString().notEmpty().trim(),
        body('linkedIn').isString().notEmpty().trim(),
        body('twitter').isString().notEmpty().trim(),
        body('bio').isString().notEmpty().trim(),
    ],
    project: [
        body('name').isString().notEmpty().trim(),
        body('start_date').isString().notEmpty().trim(),
        body('end_date').isString().notEmpty().trim(),
        body('description').isString().notEmpty().trim(),
    ],
    experience: [
        body('title').isString().notEmpty().trim(),
        body('company').isString().notEmpty().trim(),
        body('start_date').isString().notEmpty().trim(),
        body('end_date').isString().notEmpty().trim(),
        body('description').isString().notEmpty().trim(),
    ],
    education: [
        body('school').isString().notEmpty().trim(),
        body('certificate').isString().notEmpty().trim(),
        body('start_date').isString().notEmpty().trim(),
        body('end_date').isString().notEmpty().trim(),
        body('description').isString().notEmpty().trim(),
    ]

}

export default VALIDATION;