const express = require('express');
const { logger } = require('./general-middleware')
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', logger, (req, res) => {
    res.send(`
    <h2>Web46<h2>
    <p>Web Sprint Challenge Build a Web Api Homepage<p>
    `);
});

server.use('*', (req, res) => {
    res.status(404).json({
        message: "Not found"
    });
});

module.exports = server;
