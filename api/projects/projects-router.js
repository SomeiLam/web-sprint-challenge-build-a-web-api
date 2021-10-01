// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Project.get();
        if (projects) {
            res.status(200).json(projects);
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