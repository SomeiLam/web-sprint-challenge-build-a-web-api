const express = require('express');
const { checkActionId } = require('./actions-middlware')
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

router.post('/', async (req, res) => {
    try {
        const { project_id, description, notes } = req.body;
        if (!project_id || !description || !notes) {
            res.status(400).json({
                message: "Please provide project id, description and notes for the action"
            })
        } else {
            const newAction = await Action.insert(req.body)
            res.status(201).json(newAction)
        }
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const actionMaybe = await Action.get(req.params.id);
        if (actionMaybe) {
            const { project_id, description, notes, completed } = req.body;
            if (!project_id || !description || !notes || completed === undefined) {
                res.status(400).json({
                    message: "The request body is missing the required fields"
                })
            } else {
                const updatedAction = await Action.update(req.params.id, req.body)
                res.status(200).json(updatedAction)
            }
        }
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const actionMaybe = await Action.get(req.params.id);
        if (!actionMaybe) {
            res.status(404).json({
                message: `Action with id ${req.params.id} not found`
            })
        } else {
            await Action.remove(req.params.id)
            res.status(200).json()
        }
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
})

module.exports = router;