import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function create(ticket: Omit<Ticket, "id">) {
  await prisma.ticket.create({
    data: ticket
  });
}

async function getAllUserTickets(enrollmentId: number) {
  const ticket = await prisma.ticket.findMany({
    where: {
      enrollmentId
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true
        }
      },
      createdAt: true,
      updatedAt: true
    }
  });
  return ticket;
}

async function getTicket(enrollmentId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      enrollmentId,
      status: "RESERVED"
    },
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true
        }
      },
      createdAt: true,
      updatedAt: true
    }
  });
  return ticket;
}

async function getTicketById(id: number) {
  return await prisma.ticket.findFirst({
    where: {
      id
    },
    select: {
      TicketType: {
        select: {
          price: true
        }
      }
    }
  });
}

const ticketRepository = {
  create,
  getTicket,
  getTicketById,
  getAllUserTickets
};

export default ticketRepository;
