import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";

export async function createPaymentToTicket(req: AuthenticatedRequest, res: Response) {
  const body = req.body;
}
