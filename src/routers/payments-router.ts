import { createPaymentToTicket, getPaymentForTicket } from "@/controllers";
import { authenticateToken, validateBody, validateTicketId, validateTicketIdOnQuery, validateUserDoesntHaveTicket, validateUserEnrolled, validateUserHasTicketId } from "@/middlewares";
import { paymentSchema } from "@/schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", validateBody(paymentSchema), validateTicketId, validateUserEnrolled, validateUserDoesntHaveTicket, createPaymentToTicket)
  .get("/", validateTicketIdOnQuery, validateTicketId, validateUserEnrolled, validateUserHasTicketId, getPaymentForTicket);

export { paymentsRouter };
