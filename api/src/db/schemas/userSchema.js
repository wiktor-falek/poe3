import Joi from "joi";

const userSchema = Joi.object({
  account: Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .max(30)
      .required(),
    email: Joi.string()
      .min(6)
      .max(254)
      .required(),
    confirmedEmail: Joi.string()
      .min(6)
      .max(254)
      .default(null),
    registrationTimestamp: Joi.number()
      .integer()
      .default(Date.now()),
    sessionId: Joi.string()
      .default(null),
    characterLimit: Joi.number()
      .integer()
      .min(12)
      .max(36)
      .default(12)
  }),
  social: Joi.object({
    friends: Joi.array().default([])
  }),
  shared_stash: Joi.array()
  .default(new Array(20).fill(null)),
});

export default userSchema;

