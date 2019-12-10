/* 
 * External Dependecies 
*/
import Promise from 'bluebird';
import Status from 'http-status';

/* 
 * Internal Dependecies 
*/
import { Success, Fail } from '../../functions/support/response';
import MailChimpService from '../../lib/services/mailchimp';
import TheCheckerService from '../../lib/services/thechecker';
import {
  MethodNotAllowedError,
  ValidationError,
  NotFoundError,
  InternalServerError,
} from '../../lib/errors';
import { buildFailureResponse } from '../../lib/http/response';
import ListModel from './model';
import EmailModel from '../emails/model';

/**
 * Controller handler endpoint to index of validation
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const verifyContactsFromList = async (req, res) => {
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
 * Controller handler endpoint to index of validation
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const verifyContactByEmail = async (req, res) => {
  const { email } = req.body;

  if (email) {
    return res.status(Status.OK).json(Success({ email, verified: true }));
    /*
        try {
      const checkMail = 
        await TheCheckerService().sendSingleVerification({ email });

        if (checkMail) {
          const data = {
            email, 
            isChecked: true,
            result: checkMail.result,
            reason: checkMail.reason,
          };

          return res.status(Status.OK).json(Success(data));
        } else {
          return res.status(Status.INTERNAL_SERVER_ERROR)
          .json(Fail('Something went very wrong. Our team is already aligned with this.'));
        }
    } catch (err) {
      return res.status(Status.INTERNAL_SERVER_ERROR)
        .json(Fail('Something went very wrong. Our team is already aligned with this.'));
    }
    */
  } 
};

const getMembers = async (req, res) => {
  const { listId } = req.params;
  const { username } = req.body;

  try {
    // Get contacts from mailchimp list
    const contacts = await MailChimpService().getContactsFromList({ listId, getContactsFromList: username });

    return res.status(Status.OK).json(Success(contacts));
  } catch (err) {}
}

/**
 * Controller handler endpoint to get all lists given mailchimp account
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const getAll = async (req, res) => {
  try {
    const { username } = req.params;

    // Get contacts from mailchimp list
    const lists = await MailChimpService().getLists({ username });
      
    return res.status(Status.OK).json(Success(lists));
  } catch (err) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json(Success(err.message));
  } 
};

/**
 * Controller handler endpoint to create a new list and emails associated 
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const create = async (req, res) => {
  try {
    const { name, emailsInfo } = req.body;

    let list = await ListModel.create({ name });
    
    await Promise.all(emailsInfo.map(async (emailInfo) => {
      const listEmail = new EmailModel({ ...emailInfo, listId: list._id });

      await listEmail.save();

      list.emails.push(listEmail);
    }));

    await list.save();

    return res.status(Status.OK).json(Success(list));
  } catch (err) {
    return res.status(Status.SERVICE_UNAVAILABLE).json(Fail('Error while create lists'));
  }
};

/**
 * Controller handler endpoint to get all lists from db 
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const getAllLists = async (req, res) => {
  try {
    const lists = await ListModel.find().populate('emails');

    return res.status(Status.OK).json(Success(lists));
  } catch (err) {
    console.log(err);
  }
};

/**
 * Controller handler endpoint to update a given list ID
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const update = async (req, res) => {
  try {
    const { listId } = req.params;

    const list = await ListModel.findByIdAndUpdate(listId, { verified: true }, { new: true });

    return res.status(Status.OK).json(Success(list));
  } catch (err) {
    console.log(err);
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
  create,
  getAllLists,
  update,
  verifyContactsFromList,
  verifyContactByEmail,
  getAll,
  getMembers,
  defaultHandler,
};
