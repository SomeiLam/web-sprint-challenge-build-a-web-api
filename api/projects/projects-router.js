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

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.get(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({
                message: `Project with id ${req.params.id} not found`
            })
        }
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            res.status(400).json({
                message: "Please provide name and description for the project"
            })
        } else {
            const newProject = await Project.insert(req.body);
            res.status(201).json(newProject);
        }
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            res.status(404).json({
                message: `Project with id ${req.params.id} not found`
            })
        } else {
            if (!req.body.name || !req.body.description || req.body.completed === undefined) {
                res.status(400).json({
                    message: "The request body is missing the required fields"
                })
            } else {
                const updatedProject = await Project.update(req.params.id, req.body);
                res.status(200).json(updatedProject);
            }
        }
    } catch (err) {
        res.status(500).json({
            err: err.message
        })
    }
})

module.exports = router;