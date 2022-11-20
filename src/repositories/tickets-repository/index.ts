import { prisma } from "@/config";

async function validTicketType(ticketTypeId: number) {
  return;
}

async function getTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function getTickets() {
  return prisma.ticket.findFirst({
    include: {
      TicketType: true
    }
  });
}

const ticketRepository = {
  validTicketType,
  getTicketsTypes,
  getTickets
};

export default ticketRepository;
