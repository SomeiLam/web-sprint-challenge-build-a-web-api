const express = require('express');
const { checkActionId, validateNewAction, validateUpdateAction } = require('./actions-middlware')
const Action = require('./actions-model');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await Action.get();
        if (actions) {
            res.status(200).json(actions);
        } else {
            res.status(200).json([]);
        }
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
})

router.get('/:id', checkActionId, (req, res) => {
    res.status(200).json(req.action);
})

router.post('/', validateNewAction, (req, res, next) => {
    Action.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(next);
})

router.put('/:id', checkActionId, validateUpdateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
})

router.delete('/:id', checkActionId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(next);
})

module.exports = router;