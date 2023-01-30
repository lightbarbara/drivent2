import paymentsService from "@/services/payments-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validateUserDoesntHaveTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { enrollmentId } = res.locals;
  const { ticketId } = req.body;

  try {
    await paymentsService.userDoesntHaveTicket(enrollmentId, ticketId);

    next();
  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
