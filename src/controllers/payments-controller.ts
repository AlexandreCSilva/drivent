import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  if (!req.query.ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const ticketId = parseFloat(req.query.ticketId as string);

  try {
    /*  const validTicketId = await paymentsService.validTicketId(ticketId);

        if (!validTicketId) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
 
        console.log(validTicketId) */
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
