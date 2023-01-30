import { createPaymentToTicket, getPaymentForTicket } from "@/controllers";
import { authenticateToken, validateBody, validateTicketId, validateTicketIdOnQuery, validateUserDoesntHaveTicket, validateUserEnrolled, validateUserHasTicketId } from "@/middlewares";
import { paymentSchema } from "@/schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", validateUserEnrolled, validateTicketId, validateBody(paymentSchema), validateUserDoesntHaveTicket, createPaymentToTicket)
  .get("/", validateUserEnrolled, validateTicketIdOnQuery, validateTicketId, validateUserHasTicketId, getPaymentForTicket);

export { paymentsRouter };
