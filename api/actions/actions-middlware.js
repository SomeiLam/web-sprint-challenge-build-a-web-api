const yup = require('yup');
const Action = require('./actions-model');

module.exports = {
    checkActionId,
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