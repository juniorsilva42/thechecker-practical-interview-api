import { assoc } from 'ramda';

const defaultResponse = (success = true) => ({
  success,
  version: 'v1',
  date: new Date(),
});

export const Success = data => assoc(
  'data',
  data,
  defaultResponse(true),
);

export const Fail = data => assoc(
  'error',
  data,
  defaultResponse(false),
);