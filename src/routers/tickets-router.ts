import { createUserTicket, getUserTicket } from "@/controllers";
import { getTicketTypes } from "@/controllers/ticketTypes-controller";
import { authenticateToken, validateBody, validateTicketTypeId, validateUserEnrolled } from "@/middlewares";
import { ticketSchema } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(ticketSchema), validateUserEnrolled, validateTicketTypeId, createUserTicket)
  .get("/types", getTicketTypes)
  .get("/", validateUserEnrolled, getUserTicket);

export { ticketsRouter };
