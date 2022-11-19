import { AddressEnrollment } from "@/protocols";
import { getAddress } from "@/utils/cep-service";
import { notFoundError } from "@/errors";
import addressRepository, { CreateAddressParams } from "@/repositories/address-repository";
import enrollmentRepository, { CreateEnrollmentParams } from "@/repositories/enrollment-repository";
import { exclude } from "@/utils/prisma-utils";
import { Address, Enrollment } from "@prisma/client";
import ticketRepository from "@/repositories/tickets-repository";

type GetAddressResult = Omit<Address, "createdAt" | "updatedAt" | "enrollmentId">;

async function createTicket(tickedTypeId: number) {
  const validType = await ticketRepository.validTicketType((tickedTypeId));

  /* const enrollment = exclude(params, "address");

  const result = await;
  if (result.error) {
    throw notFoundError();
  }

  const newEnrollment = await enrollmentRepository.upsert(params.userId, enrollment, exclude(enrollment, "userId"));

  await addressRepository.upsert(newEnrollment.id, address, address); */
}

async function getTicketsType() {
  return await ticketRepository.getTicketsTypes();
}

const ticketsService = {
  createTicket,
  getTicketsType
};

export default ticketsService;
