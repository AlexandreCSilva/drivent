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

const ticketRepository = {
  getTicketsTypes,
  getTickets,
  createTicket
};

export default ticketRepository;
