import ticketTypeService from "@/services/ticketType-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validateTicketTypeId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketTypeId } = req.body;

  try {
    await ticketTypeService.findTicketTypeId(ticketTypeId);

    next();
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
