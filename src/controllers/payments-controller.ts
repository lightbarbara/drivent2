import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function createPaymentToTicket(req: AuthenticatedRequest, res: Response) {
  const payment = req.body;
  
  try {
    const paymentToTicket = await paymentsService.createPaymentToTicket(payment);

    res.status(httpStatus.OK).send(paymentToTicket);
  } catch (err) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getPaymentForTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = res.locals;

  try {
    const payment = await paymentsService.getPaymentForTicket(parseInt(ticketId));

    res.status(httpStatus.OK).send(payment);
  } catch (err) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
