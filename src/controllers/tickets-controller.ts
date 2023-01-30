import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/ticket-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function createUserTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { enrollmentId } = res.locals;

  try {
    const returnedTicket = await ticketsService.createUserTicket(ticketTypeId, enrollmentId);

    return res.status(httpStatus.CREATED).send(returnedTicket);
  } catch (err) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const { enrollmentId } = res.locals;
  try {
    const returnedTicket = await ticketsService.getUserTicket(enrollmentId);

    return res.status(httpStatus.OK).send(returnedTicket);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
