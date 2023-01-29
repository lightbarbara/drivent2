import { notFoundError } from "@/errors";
import ticketTypeRepository from "@/repositories/ticketType-repository";

async function findTicketTypeId(ticketTypeId: number) {
  const ticketType = await ticketTypeRepository.findFirst(ticketTypeId);

  if (!ticketType) {
    throw notFoundError();
  }
}

const ticketTypeService = {
  findTicketTypeId,
};

export default ticketTypeService;
