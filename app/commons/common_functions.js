const ClientError = require('./exceptions/ClientError');

const common_functions = {
  handlerErrorHandler: (res, err) => {
    if (err instanceof ClientError) {
      return res.status(err.statusCode).json(
        {
          status: 'fail',
          message: err.message,
        },
      );
    }

    return res.status(500).json(
      {
        status: 'fail',
        message: 'Internal server error',
      },
    );
  },
};

module.exports = common_functions;
