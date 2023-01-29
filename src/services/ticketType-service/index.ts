import { notFoundError } from "@/errors";
import ticketTypeRepository from "@/repositories/ticketType-repository";

async function getAllTicketTypes() {
  const ticketTypes = await ticketTypeRepository.findAll();
  return ticketTypes;
}

async function findTicketTypeId(ticketTypeId: number) {
  const ticketType = await ticketTypeRepository.findTicket(ticketTypeId);

  if (!ticketType) {
    throw notFoundError();
  }
}

const ticketTypeService = {
  getAllTicketTypes,
  findTicketTypeId,
};

export default ticketTypeService;
