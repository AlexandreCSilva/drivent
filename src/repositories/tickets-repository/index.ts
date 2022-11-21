import { prisma } from "@/config";
import { newTicket } from "@/schemas";
import { number } from "joi";

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

async function upsertTicket(enrollmentId: number, ticketTypeId: number, ticketId: number) {
  const result = await prisma.ticket.upsert({
    where: {
      id: ticketId
    },
    create: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: "RESERVED",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    update: {
      status: "PAID"
    },
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
  upsertTicket,
  getTicketById,
  getTicketTypeById
};

export default ticketRepository;
