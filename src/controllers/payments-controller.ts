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
    const result = await paymentsService.getPayments(ticketId, req.userId);

    return res.send(result).status(httpStatus.OK);
  } catch (error) {
    if (error.name == "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name == "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postPayments(req: AuthenticatedRequest, res: Response) {
  if (!req.body.ticketId || !req.body.cardData) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const result = await paymentsService.postPayments(req.body, req.userId);

    return res.send(result).status(httpStatus.OK);
  } catch (error) {
    if (error.name == "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name == "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
