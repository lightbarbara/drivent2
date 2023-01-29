import { createUserTicket, getTicketTypes, getUserTicket } from "@/controllers";
import { authenticateToken, validateBody, validateTicketTypeId, validateUserEnrolled, validateUserHasTicket } from "@/middlewares";
import { ticketSchema } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(ticketSchema), validateUserEnrolled, validateUserHasTicket, validateTicketTypeId, createUserTicket)
  .get("/types", getTicketTypes)
  .get("/", validateUserEnrolled, getUserTicket);

export { ticketsRouter };
