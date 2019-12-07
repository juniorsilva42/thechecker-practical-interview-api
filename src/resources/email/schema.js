import Joi from 'joi';

const indexSchema = {
  id: Joi
    .string(),

  created_at: Joi
    .date(),
}

module.exports = {
  indexSchema,
}
