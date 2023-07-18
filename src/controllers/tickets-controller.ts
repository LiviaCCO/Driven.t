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
    } catch (err) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}
export async function postTicket(req: AuthenticatedRequest, res: Response) {
    const {ticketTypeId} = req.body;
    const {userId} = req;
    
    try {
        if(!userId){
          return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if(!ticketTypeId){
          return res.sendStatus(httpStatus.BAD_REQUEST);
        } 
        const newTicket = await ticketService.createTicket(ticketTypeId, userId);
        return res.status(httpStatus.CREATED).send(newTicket);
      } catch (err) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
}