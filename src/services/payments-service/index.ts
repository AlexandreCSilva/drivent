import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";
import { Request } from "express";

async function getPayments(ticketId: number, userId: number) {
  const validTicketId = await ticketRepository.getTicketById(ticketId);

  if (!validTicketId) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  
  if (!enrollment) throw unauthorizedError();

  if (validTicketId.enrollmentId !== enrollment.id) throw unauthorizedError();

  return await paymentsRepository.getPayments(ticketId);
}

async function userOwnTicket(ticketId: number) {
  //return await ticketRepository.getTicketById(ticketId);
}

const paymentsService = {
  getPayments,
};

export default paymentsService;
