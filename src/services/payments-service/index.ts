import { notFoundError } from "@/errors";
import paymentsRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";
import { Request } from "express";

async function validTicketId(ticketId: number) {
  //return await ticketRepository.getTicketById(ticketId);
}

async function userOwnTicket(ticketId: number) {
  //return await ticketRepository.getTicketById(ticketId);
}

const paymentsService = {
  validTicketId,
};

export default paymentsService;
