import { AuthenticatedRequest } from "@/middlewares";
import ticketTypeService from "@/services/ticketType-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketTypeService.getAllTicketTypes();

    return res.status(httpStatus.OK).send(tickets);
  } catch (err) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
