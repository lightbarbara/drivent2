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

async function userDoesntHaveTicketIdOnHistory(enrollmentId: number, ticketId: number) {
  const userDoesntHaveTicket = await paymentRepository.findFirst(enrollmentId, ticketId);

  if (!userDoesntHaveTicket.id) {
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

async function getPaymentForTicket(ticketId: number) {
  const payment = await paymentRepository.getPaymentForTicket(ticketId);

  return payment;
}

const paymentsService = {
  userDoesntHaveTicket,
  createPaymentToTicket,
  getPaymentForTicket,
  userDoesntHaveTicketIdOnHistory
};

export default paymentsService;
