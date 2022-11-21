import Joi from "joi";

export const bodyTicketSchema = Joi.object({
  ticketTypeId: Joi.number().required()
});
