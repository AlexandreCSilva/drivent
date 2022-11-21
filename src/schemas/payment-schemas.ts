import Joi from "joi";

const cardDataSchema = Joi.object({
  issuer: Joi.string().required(),
  number: Joi.number().required(),
  name: Joi.string().required(),
  expirationDate: Joi.date().required(),
  cvv: Joi.number().required(),
});
  
export const bodyPaymentSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: cardDataSchema
});

type cardDataType = {
    issuer: string,
    number: string,
    name: string,
    expirationDate: string,
    cvv: number,
}

export type bodyPaymentType = {
    ticketId: number,
    cardData: cardDataType
}
