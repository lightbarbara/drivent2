import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findFirst(enrollmentId: number, ticketId: number) {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
      id: ticketId
    }
  });
}

async function createPaymentToTicket(payment: Omit<Payment, "id">) {
  return await prisma.payment.create({
    data: {
      ticketId: payment.ticketId,
      value: payment.value,
      cardIssuer: payment.cardIssuer,
      cardLastDigits: payment.cardLastDigits,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt
    }
  });
}

async function updateTicketStatus(payment: Omit<Payment, "id">) {
  return await prisma.ticket.update({
    where: {
      id: payment.ticketId,
    },
    data: {
      status: "PAID",
      updatedAt: new Date()
    }
  });
}

const paymentRepository = {
  findFirst,
  createPaymentToTicket,
  updateTicketStatus
};

export default paymentRepository;
