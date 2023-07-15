import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/tickets-service';

export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const ticketId = req.params;
    if(!ticketId){
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    try {
        const ticketUserId = await ticketPaymentService.getUserTicketPayment(userId);
        const payment = await ticketPaymentService.getTicketPayment(ticketId);
        if(!payment){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if(payment.ticketId !== ticketUserId.id){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
            }
      return res.status(httpStatus.OK).send(payment);
    } catch (error) {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
}

export async function postTicketPayment (req: AuthenticatedRequest, res: Response) {
    const {ticket} = req.body;
    const userId = req.userId;
    
    try {
        if(!ticket.cardData || !ticket.ticketId){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        //Retorno quando ticketId não existe
        const findTicket = await ticketPaymentService.getTicket(ticket.ticketId);
        if(!findTicket){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        //Retorno quando usuário não possui o ticketId 401
        const findTicketByUserId = await ticketPaymentService.getEnrollment(findTicket.enrollmentId);
        if(findTicketByUserId.userId !== userId){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        const paidTicket = await ticketService.createTicket(ticket, userId);
        return res.status(httpStatus.OK).send(paidTicket);
      } catch (error) {
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
}