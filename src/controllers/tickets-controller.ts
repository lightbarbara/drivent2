import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";

export async function createTicketToUser(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
}
