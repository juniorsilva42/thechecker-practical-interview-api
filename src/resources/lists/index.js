/* 
 * External Dependecies 
*/
import Promise from 'bluebird';
import Status from 'http-status';

/* 
 * Internal Dependecies 
*/
import { Success } from '../../functions/support/response';
import MailChimpService from '../../lib/services/mailchimp';
import TheCheckerService from '../../lib/services/thechecker';
import {
  MethodNotAllowedError,
  ValidationError,
  NotFoundError,
  InternalServerError,
} from '../../lib/errors';
import { buildFailureResponse } from '../../lib/http/response';

/**
 * Controller handler endpoint to index of validation
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const index = async (req, res) => {
  const { listId } = req.params;

  // Get contacts from mailchimp list
  const contacts = await MailChimpService().getContactsFromList({ listId });
  
  let checkedQueue = [];

  // Parse contacts 
  if (contacts) {
    for (let contact of contacts) {
      const { email_address: email } = contact;
      
      try {
        const checkMail = 
          await TheCheckerService().sendSingleVerification({ email });

          if (checkMail) {
            checkedQueue.push({ 
              email, 
              isChecked: true,
              result: checkMail.result,
              reason: checkMail.reason,
            });
          } else {
            checkedQueue.push({
              email, 
              isChecked: false,
            });
          }
      } catch (err) {
        return res.status(Status.INTERNAL_SERVER_ERROR)
          .json(Fail('Something went very wrong. Our team is already aligned with this.'));
      }
    }

    return res.status(Status.OK).json(Success(checkedQueue));
  }
};

/**
 * Controller handler endpoint to get all lists given mailchimp account
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const getAll = async (req, res) => {
  try {
    // Get contacts from mailchimp list
    const lists = await MailChimpService().getLists();
        
    return res.status(Status.OK).json(Success(lists));
  } catch (err) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json(Success(err.message));
  } 
};

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

const defaultHandler = (req, res) => {
  const requestId = req.get('x-request-id') || defaultCuidValue('req_')()

  return Promise.reject(new MethodNotAllowedError({
    message: `${req.method} method is not allowed for resource`,
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
  getAll,
  defaultHandler,
};
