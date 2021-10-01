// Write your "actions" router here!
const express = require('express');
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

router.get('/:id', async (req, res) => {
    try {
        const action = await Action.get(req.params.id);
        if (!action) {
            res.status(404).json({
                message: `Action with id ${req.params.id} not found`
            })
        } else {
            res.status(200).json(action)
        }
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
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

module.exports = router;