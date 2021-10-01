// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = Action.get();
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

module.exports = router;