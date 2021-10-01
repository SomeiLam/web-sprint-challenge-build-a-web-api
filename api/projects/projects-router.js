const express = require('express');
const { checkProjectId, validateNewProject, validateUpdateProject } = require('./projects-middleware');
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

router.get('/:id', checkProjectId, (req, res) => {
    res.status(200).json(req.project);
})

router.post('/', validateNewProject, (req, res, next) => {
    Project.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(next);
})

router.put('/:id', validateUpdateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next);
})

router.delete('/:id', checkProjectId, async (req, res, next) => {
    Project.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'The project has been removed' });
        })
        .catch(next);
})

router.get('/:id/actions', checkProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(next);
})

module.exports = router;