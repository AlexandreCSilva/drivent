import { Ticket } from "@prisma/client";
import Joi from "joi";

const ticketType = Joi.number().required();

export const bodyTicketSchema = Joi.object({
  ticketTypeId: ticketType
});

export type newTicket = Omit<Ticket, "id">;
