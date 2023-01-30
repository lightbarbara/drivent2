import paymentsService from "@/services/payments-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validateUserHasTicketId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { enrollmentId, ticketId } = res.locals;

  try {
    await paymentsService.userDoesntHaveTicketIdOnHistory(enrollmentId, parseInt(ticketId));

    next();
  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
