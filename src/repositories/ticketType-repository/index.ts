import { prisma } from "@/config";

async function findFirst(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    }
  });
}

const ticketTypeRepository = {
  findFirst
};

export default ticketTypeRepository;
