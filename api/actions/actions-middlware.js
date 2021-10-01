const yup = require('yup');
const Action = require('./actions-model');

module.exports = {
    checkActionId,
    validateNewAction,
    validateUpdateAction,
}

async function checkActionId(req, res, next) {
    try {
        const actionMaybe = await Action.get(req.params.id)
        if (actionMaybe) {
            req.action = actionMaybe
            next()
        } else {
            next({ status: 404, message: `Action with id ${req.params.id} not found` })
        }
    } catch (error) {
        next(error)
    }
}

const actionSchema = yup.object().shape({
    project_id: yup
        .number()
        .typeError('project id must be a number')
        .required('project id is required'),
    description: yup
        .string()
        .typeError('description must be a string')
        .trim()
        .required('description is required')
        .max(128, 'maximum characters is 128'),
    notes: yup
        .string()
        .typeError('notes must be a string')
        .trim()
        .required()
        .max(128, 'maximum characters is 128'),
    completed: yup
        .boolean()
        .typeError('completed must be a boolean')
        .required('completed is required')
})

async function validateNewAction(req, res, next) {
    try {
        if (req.body.completed === undefined) {
            req.body.completed = false;
        }
        const validated = await actionSchema.validate(
            req.body,
            { strict: false, stripUnknown: true }
        )
        req.body = validated
        next()
    } catch (err) {
        next({ status: 400, message: "Please provide project id, description and notes for the action" })
    }
}

async function validateUpdateAction(req, res, next) {
    try {
        const validated = await actionSchema.validate(
            req.body,
            { strict: false, stripUnknown: true }
        )
        req.body = validated
        next()
    } catch (err) {
        next({ status: 400, message: "Please provide project id, description, notes and completed for the action" })
    }
}