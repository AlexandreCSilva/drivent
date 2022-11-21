import { Ticket } from "@prisma/client";
import Joi from "joi";

export const bodyTicketSchema = Joi.object({
  ticketTypeId: Joi.number().required()
});

export type newTicket = Omit<Ticket, "id">;
