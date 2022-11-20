import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postCreateTicket(req: AuthenticatedRequest, res: Response) {
  try {
    await ticketsService.createTicket(req.body.ticketTypeId);

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTicketsWithTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketsService.getTicketsType();

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketsService.getTickets();

    if (!result) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    console.log(result);
    return res.send(result).status(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
