import { prisma } from "@/config";
import { newTicket } from "@/schemas";

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

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  const result = await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: "RESERVED",
      createdAt: Date.now() as unknown as Date,
      updatedAt: Date.now() as unknown as Date,
    }
  });

  return result;
}

async function getTicketById(ticketId: number) {
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId
    }
  });
}

async function getTicketTypeById(ticketTypeId: number) {
  return await prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId
    }
  });
}

const ticketRepository = {
  getTicketsTypes,
  getTickets,
  createTicket,
  getTicketById,
  getTicketTypeById
};

export default ticketRepository;
