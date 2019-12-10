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
const verifyContactByEmail = async (req, res) => {
  const { email } = req.body;

  if (email) {
    try {
      const checkMail = 
        await TheCheckerService().sendSingleVerification({ email });

        if (checkMail) {
          // Update info of emails
          const getSpecificEmail = await EmailModel.findOne({ email_address: email });
          const updatedEmail = await EmailModel.findByIdAndUpdate(getSpecificEmail._id, { status: checkMail.result, statusDetail: checkMail.reason }, { new: true });

          return res.status(Status.OK).json(Success(updatedEmail));
        }
    } catch (err) {
      return res.status(Status.INTERNAL_SERVER_ERROR)
        .json(Fail('Something went very wrong. Our team is already aligned with this.'));
    }
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
    const { name, mailchimpListId , emailsInfo } = req.body;

    let list = await ListModel.create({ name, mailchimpListId });
    
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
const updateStatus = async (req, res) => {
  try {
    const { listId } = req.params;

    const list = await ListModel.findByIdAndUpdate(listId, { verified: true }, { new: true });

    return res.status(Status.OK).json(Success(list));
  } catch (err) {
    console.log(err);
  }
};

/**
 * Controller handler endpoint get results by id
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const getById = async (req, res) => {
  try {
    const { listId } = req.params;

    const selectedList = await ListModel.find({ mailchimpListId: listId }).populate('emails');

    return res.status(Status.OK).json(Success(selectedList));
  } catch (err) {
    console.log(err);
  }
};

/**
 * Controller handler endpoint to get list by mailchimp list id to pre save verification. This avoid duplicates
 * @param {Object} req
 * @param {Object} res
 * @return {*}
*/
const listPreSave = async (req, res) => {
  try {
    const { mailchimpListId } = req.params;

    const listPreSave = await ListModel.findOne({ mailchimpListId });

    return res.status(Status.OK).json(Success(listPreSave));
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
  updateStatus,
  listPreSave,
  verifyContactByEmail,
  getById,
  getAll,
  getMembers,
  defaultHandler,
};
