import { conflictError, notFoundError } from "@/errors";
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

async function userHasTicket(enrollmentId: number) {
  const userHasTicketUnpaid = await ticketRepository.getAllUserTickets(enrollmentId);
  
  const ticketsUnpaid = userHasTicketUnpaid.filter(t => t.status !== "PAID");

  if (ticketsUnpaid.length > 0) {
    throw conflictError("User already has a ticket unpaid");
  }
}

async function findTicketById(ticketId: number) {
  const newId = Number(ticketId);

  const ticketExists = await ticketRepository.getTicketById(newId);

  if (!ticketExists) {
    throw notFoundError();
  }
}

const ticketsService = {
  createUserTicket,
  getUserTicket,
  userHasTicket,
  findTicketById
};

export default ticketsService;
