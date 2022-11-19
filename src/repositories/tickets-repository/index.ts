import { prisma } from "@/config";

async function validTicketType(ticketTypeId: number) {
  return;
}

async function getTicketsTypes() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  validTicketType,
  getTicketsTypes
};

export default ticketRepository;
