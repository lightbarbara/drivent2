import { prisma } from "@/config";

async function findAll() {
  return prisma.ticketType.findMany();
}

async function findTicket(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    }
  });
}

const ticketTypeRepository = {
  findAll,
  findTicket
};

export default ticketTypeRepository;
