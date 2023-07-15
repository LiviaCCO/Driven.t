import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/tickets-service';

export async function getTicketType(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
      const ticketType = await ticketService.getTicketType();
  
      return res.status(httpStatus.OK).send(ticketType);
    } catch (error) {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
}
export async function getTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
      const ticket = await ticketService.getTicket(userId);
      //se estiver sem cadastro ou ticket
      if(!ticket || !userId){
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.status(httpStatus.OK).send(ticket);
    } catch (error) {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
}
export async function postTicket(req: AuthenticatedRequest, res: Response) {
    const ticket = req.body;
    const userId = req.userId;
    
    try {
        if(!userId){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        const newTicket = await ticketService.createTicket(ticket, userId);
        if(!newTicket){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        return res.status(httpStatus.CREATED).send(newTicket);
      } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
}