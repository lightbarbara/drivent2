import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import { Ticket } from "@prisma/client";

async function createUserTicket(ticketTypeId: number, enrollmentId: number) {
  const ticket: Omit<Ticket, "id"> = {
    ticketTypeId,
    enrollmentId,
    status: "RESERVED",
    createdAt: new Date(),
    updatedAt: new Date()
  };
  await ticketRepository.create(ticket);
  const returnedTicket = await ticketRepository.getTicket(enrollmentId);
  return returnedTicket;
}

async function getUserTicket(enrollmentId: number) {
  const returnedTicket = await ticketRepository.getTicket(enrollmentId);

  if (!returnedTicket) {
    throw notFoundError();
  }

  return returnedTicket;
}

const ticketsService = {
  createUserTicket,
  getUserTicket
};

export default ticketsService;
