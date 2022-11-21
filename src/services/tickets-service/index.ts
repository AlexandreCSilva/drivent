import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository";

async function createTicket(ticketTypeId: number, userId: number) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  
  if (!enrollment) throw notFoundError();

  const ticketType = await ticketRepository.getTicketTypeById(ticketTypeId);

  const ticket = await ticketRepository.upsertTicket(enrollment.id, ticketTypeId, 0);
  
  const result = {
    id: ticket.id,
    ticketTypeId: ticket.ticketTypeId,
    enrollmentId: ticket.enrollmentId,
    status: ticket.status,
    TicketType: ticketType,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
  };

  return result;
}

async function getTicketsType(userId: number) {
  return await ticketRepository.getTicketsTypes(userId);
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
