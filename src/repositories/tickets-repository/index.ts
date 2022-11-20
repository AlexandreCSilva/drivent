import { prisma } from "@/config";

async function getTicketsTypes(userId: number) {
  return prisma.ticketType.findMany({
    where: {
      Ticket: {
        every: {
          Enrollment: {
            userId: userId
          }
        }
      }
    }
  });
}

async function getTickets(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId
      }
    },
    include: {
      TicketType: true
    }
  });
}

async function createTicket(ticketTypeId: number) {
  const ticketType = await prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId
    }
  });
}

async function getTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    }
  });
}

const ticketRepository = {
  getTicketsTypes,
  getTickets,
  createTicket
};

export default ticketRepository;
