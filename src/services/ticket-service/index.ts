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

const ticketsService = {
  createUserTicket
};

export default ticketsService;
