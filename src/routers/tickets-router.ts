import { createUserTicket } from "@/controllers";
import { authenticateToken, validateBody, validateTicketTypeId, validateUserEnrolled } from "@/middlewares";
import { ticketSchema } from "@/schemas";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(ticketSchema), validateUserEnrolled, validateTicketTypeId, createUserTicket)
  .get("/types")
  .get("/");

export { ticketsRouter };
