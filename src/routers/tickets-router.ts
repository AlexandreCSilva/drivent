import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { postCreateTicket, getTickets, getTicketsTypes } from "@/controllers";
import { bodyTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTickets)
  .post("/", validateBody(bodyTicketSchema), postCreateTicket);

export { ticketsRouter };
