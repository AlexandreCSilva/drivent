import { notFoundError, unauthorizedError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";
import { bodyPaymentType } from "@/schemas/payment-schemas";

async function getPayments(ticketId: number, userId: number) {
  const validTicketId = await ticketRepository.getTicketById(ticketId);

  if (!validTicketId) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  
  if (!enrollment) throw unauthorizedError();

  if (validTicketId.enrollmentId !== enrollment.id) throw unauthorizedError();

  return await paymentsRepository.getPayments(ticketId);
}

async function postPayments(bodyPayment: bodyPaymentType, userId: number) {
  const ticket = await ticketRepository.getTicketById(bodyPayment.ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  
  if (!enrollment) throw unauthorizedError();

  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedError();

  const ticketType = await ticketRepository.getTicketTypeById(ticket.ticketTypeId);

  if (!ticketType) throw notFoundError();
  const result =await paymentsRepository.postPayments(bodyPayment, ticketType.price);
  
  console.log(result);
  return result;
}

const paymentsService = {
  getPayments,
  postPayments
};

export default paymentsService;
