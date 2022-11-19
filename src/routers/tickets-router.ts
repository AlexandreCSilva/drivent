import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { postCreateTicket, getTicketsWithTypes } from "@/controllers";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsWithTypes)
  .post("/", validateBody(createTicketSchema), postCreateTicket);

export { ticketsRouter };
