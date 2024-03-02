const constant = require('../constants');

const errorHandler = (error, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 500;

    switch (statusCode) {
        case constant.VALIDATION_ERROR:
            response.json({
                title: 'Validation Error',
                message: error.message,
                stackTrace: error.stack
            });
            break;

        case constant.UNAUTHORIZED:
            response.json({
                title: 'Unauthorized',
                message: error.message,
                stackTrace: error.stack
            });
            break;

        case constant.FORBIDDEN:
            response.json({
                title: 'Forbidden',
                message: error.message,
                stackTrace: error.stack
            });
            break;

        case constant.NOT_FOUND:
            response.json({
                title: 'Not Found',
                message: error.message,
                stackTrace: error.stack
            });

        case constant.SERVER_ERROR:
            response.json({
                title: 'Not Found',
                message: error.message,
                stackTrace: error.stack
            });

        default:
            response.json({ message: 'No Error' });
    }
}

module.exports = errorHandler;