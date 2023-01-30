import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "./authentication-middleware";

export async function validateTicketIdOnQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId } = req.query;

  try {
    if (!ticketId) {
      throw { status_code: httpStatus.BAD_REQUEST };
    }

    res.locals.ticketId = ticketId;

    next();
  } catch (err) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
