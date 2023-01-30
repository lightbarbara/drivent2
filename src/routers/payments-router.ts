import { createPaymentToTicket } from "@/controllers";
import { authenticateToken, validateBody, validateTicketId, validateUserDoesntHaveTicket, validateUserEnrolled } from "@/middlewares";
import { paymentSchema } from "@/schemas/payment-schema";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", validateUserEnrolled, validateTicketId, validateBody(paymentSchema), validateUserDoesntHaveTicket, createPaymentToTicket)
  .get("/", validateTicketId);

export { paymentsRouter };
