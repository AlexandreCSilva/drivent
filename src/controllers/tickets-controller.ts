import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postCreateTicket(req: AuthenticatedRequest, res: Response) {
  try {
    /* const validEnrollment = await ticketsService.validateUserEnrollmentTicket();

    if (validEnrollment.Enrollment.length == 0) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } */

    const response = await ticketsService.createTicket(req.body.ticketTypeId);

    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketsService.getTicketsType(req.userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketsService.getTickets(req.userId);

    return res.send(result).status(httpStatus.OK);
  } catch (error) {
    if (error.name == "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
