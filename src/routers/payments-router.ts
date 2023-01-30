import { createPaymentToTicket } from "@/controllers";
import { authenticateToken, validateBody, validateTicketTypeId, validateUserDoesntHaveTicket, validateUserEnrolled } from "@/middlewares";
import { paymentSchema } from "@/schemas/payment-schema";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", validateUserEnrolled, validateTicketTypeId, validateBody(paymentSchema), validateUserDoesntHaveTicket, createPaymentToTicket)
  .get("/");

export { paymentsRouter };
