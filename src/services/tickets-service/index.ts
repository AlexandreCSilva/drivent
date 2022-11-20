import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";

async function createTicket(ticketTypeId: number) {
  return ticketRepository.createTicket(ticketTypeId);
}

async function getTicketsType(userId: number) {
  return await ticketRepository.getTicketsTypes();
}

async function getTickets(userId: number) {
  const tickets =  await ticketRepository.getTickets(userId);

  if (!tickets) throw notFoundError();

  return tickets;
}

const ticketsService = {
  createTicket,
  getTicketsType,
  getTickets
};

export default ticketsService;
