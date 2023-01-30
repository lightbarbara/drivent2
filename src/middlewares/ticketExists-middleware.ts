import ticketsService from "@/services/ticket-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validateTicketId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId } = req.body;

  try {
    await ticketsService.findTicketById(ticketId);

    next();
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
