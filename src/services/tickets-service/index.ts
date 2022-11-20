import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository";
import { newTicket } from "@/schemas";

async function createTicket(ticketTypeId: number, userId: number) {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  
  if (!enrollment) throw notFoundError();

  const result = await ticketRepository.createTicket(enrollment.id, ticketTypeId);
  
  console.log(result);
  
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
