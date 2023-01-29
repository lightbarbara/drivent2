import { prisma } from "@/config";

async function findAll() {
  return prisma.ticketType.findMany();
}

async function findFirst(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    }
  });
}

const ticketTypeRepository = {
  findAll,
  findFirst
};

export default ticketTypeRepository;
