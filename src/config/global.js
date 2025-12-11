export const RESPONSE = {
  SUCCESS: {
    code: 200,
    message: "Everything worked as expected.",
  },
  REQUIRED: {
    code: 201,
    message: "is mandatory parameter.",
  },
  INVALID: {
    code: 202,
    message: "is invalid.",
  },
  ALRDY_EXIST: {
    code: 204,
    message: "already exist.",
  },
  NOT_FOUND: {
    code: 205,
    message: "not found.",
  },
  INVALID_TOKEN: {
    code: 400,
    message: "Invalid token",
  },
  ACCESS_DENIED: {
    code: 401,
    message: "Access denied. Unauthorized user",
  },
  UNKNOWN_ERR: {
    code: 500,
    message: "Something went wrong!",
  },
};
