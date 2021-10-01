module.exports = {
    logger,
    errorHandling,
}

function logger(req, res, next) {
    console.log(`it is a ${req.method} request to ${req.originalUrl}`)
    next()
}

// eslint-disable-next-line
function errorHandling(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
    })
}
