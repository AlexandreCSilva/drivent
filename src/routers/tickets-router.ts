import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { postCreateTicket, getTickets, getTicketsTypes } from "@/controllers";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTickets)
  .post("/", validateBody(createTicketSchema), postCreateTicket);

export { ticketsRouter };
