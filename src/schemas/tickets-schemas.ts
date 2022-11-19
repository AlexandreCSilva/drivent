import Joi from "joi";

const ticketType = Joi.number().required();

export const createTicketSchema = Joi.object({
  ticketTypeId: ticketType
});
