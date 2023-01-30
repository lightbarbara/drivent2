import { unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { PaymentCreate } from "@/schemas/payment-schema";

async function userDoesntHaveTicket(enrollmentId: number, ticketId: number) {
  const userDoesntHaveTicket = await paymentRepository.findFirst(enrollmentId, ticketId);

  if (!userDoesntHaveTicket.id || userDoesntHaveTicket.status === "PAID") {
    throw unauthorizedError();
  }
}

async function createPaymentToTicket(payment: PaymentCreate) {
  const value = (await ticketRepository.getTicketById(payment.ticketId)).TicketType.price;

  const paymentToRecord = {
    ticketId: payment.ticketId,
    value,
    cardIssuer: payment.cardData.issuer,
    cardLastDigits: payment.cardData.number.toString().slice(-4),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const paymentToTicket = await paymentRepository.createPaymentToTicket(paymentToRecord);

  await paymentRepository.updateTicketStatus(paymentToTicket);

  return paymentToTicket;
}

const paymentsService = {
  userDoesntHaveTicket,
  createPaymentToTicket
};

export default paymentsService;
