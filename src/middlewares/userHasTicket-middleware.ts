import ticketsService from "@/services/ticket-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validateUserHasTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { enrollmentId } = res.locals;

  try {
    const userHasTicket = await ticketsService.userHasTicket(enrollmentId);

    next();
  } catch (err) {
    return res.sendStatus(httpStatus.CONFLICT);
  }
}
