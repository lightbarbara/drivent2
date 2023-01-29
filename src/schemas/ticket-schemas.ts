import { Ticket } from "@prisma/client";
import Joi from "joi";

type TicketCreate = Pick<Ticket, "ticketTypeId">

export const ticketSchema = Joi.object<TicketCreate>({
  ticketTypeId: Joi.number().required()
});
