import { createPaymentToTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", createPaymentToTicket)
  .get("/");

export { paymentsRouter };
