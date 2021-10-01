// add middlewares here related to projects
const yup = require('yup');
const Project = require('./projects-model');

module.exports = {
    checkProjectId,
    validateNewProject,
    validateUpdateProject,
}

async function checkProjectId(req, res, next) {
    try {
        const projectMaybe = await Project.get(req.params.id)
        if (projectMaybe) {
            req.project = projectMaybe
            next()
        } else {
            next({ status: 404, message: `Project with id ${req.params.id} not found` })
        }
    } catch (error) {
        next(error)
    }
}

const projectSchema = yup.object().shape({
    name: yup
        .string()
        .typeError('name must be a string')
        .trim()
        .required('name is required')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
    description: yup
        .string()
        .typeError('description must be a string')
        .trim()
        .required('description is required'),
    completed: yup
        .boolean()
        .typeError('completed must be a boolean')
        .required('completed is required')
})

async function validateNewProject(req, res, next) {
    try {
        if (req.body.completed === undefined) {
            req.body.completed = false;
        }
        const validated = await projectSchema.validate(
            req.body,
            { strict: false, stripUnknown: true }
        )
        req.body = validated
        next()
    } catch (err) {
        next({ status: 400, message: err.message })
    }
}

async function validateUpdateProject(req, res, next) {
    try {
        const validated = await projectSchema.validate(
            req.body,
            { strict: false, stripUnknown: true }
        )
        req.body = validated
        next()
    } catch (err) {
        next({ status: 400, message: err.message })
    }
}