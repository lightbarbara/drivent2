import { createTicketToUser } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .post("/", createTicketToUser)
  .get("/types")
  .get("/");

export { ticketsRouter };
