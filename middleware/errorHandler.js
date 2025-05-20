const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => { 
    console.log(err);
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode)
    {
        case constants.VALIDATION_ERROR:
            res.json({ title: 'Bad Request', message: err.message, stack: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: 'Not Found', message: err.message, stack: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: 'Server Error', message: err.message, stack: err.stack });
            break;
        default:
            console.log('No error');
            break;
    } 
}

module.exports = errorHandler;