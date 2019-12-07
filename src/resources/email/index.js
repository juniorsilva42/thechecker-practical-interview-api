const Promise = require('bluebird');
const { buildFailureResponse } = require('../../lib/http/response');
const {
  MethodNotAllowedError,
  ValidationError,
  NotFoundError,
  InternalServerError,
} = require('../../lib/errors')

import MailChimpService from '../../lib/services/mailchimp';

const handleError = (err) => {
  if (err instanceof ValidationError) {
    return buildFailureResponse(400, err)
  }

  if (err instanceof NotFoundError) {
    return buildFailureResponse(404, err)
  }

  if (err instanceof MethodNotAllowedError) {
    return buildFailureResponse(405, err)
  }

  return buildFailureResponse(500, new InternalServerError())
}

/**
 * Controller handler endpoint to index of validation
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const index = async (req, res) => {
  console.log(await MailChimpService().getContactsFromList({ listId: '402ccf82d3' }));
};

const defaultHandler = (req, res) => {
  const requestId = req.get('x-request-id') || defaultCuidValue('req_')()
  const logger = makeLogger({ operation: 'handle_default_boleto_request' }, { id: requestId })

  return Promise.reject(new MethodNotAllowedError({
    message: `${req.method} method is not allowed for boleto resource`,
  }))
    .catch((err) => {
      logger.error({
        status: 'failed',
        metadata: {
          error_name: err.name,
          error_stack: err.stack,
          error_message: err.message,
        },
      })
      return handleError(err)
    })
    .tap(({ body, statusCode }) => res.status(statusCode).send(body))
}

module.exports = {
  index,
  defaultHandler,
};
