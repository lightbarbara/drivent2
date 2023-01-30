import Joi from "joi";

export type PaymentCreate = {
  ticketId: number,
  cardData: {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
  }
};

export const paymentSchema = Joi.object<PaymentCreate>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().valid("VISA", "MASTERCARD").required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.date().min("now").required(),
    cvv: Joi.number().required()
  }).required()
});
