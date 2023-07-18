import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/tickets-service';
import ticketPaymentService from '@/services/payments-service';

//Informações sobre o pagamento
export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const ticketId = Number(req.query.ticketId);
    // quando o ticketId não é enviado
    if(!ticketId){
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    try {
        /* //quando o ticketId não está associado ao usuario
        const findTicket = await ticketService.getTicket(userId);
        ///////
        if(findTicket.ticketTypeId!==ticketId){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        } */
        const payment = await ticketPaymentService.getTicketPayment(userId, ticketId);
        //quando o ticketId não existe
        if(!payment){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.status(httpStatus.OK).send(payment); 
    } catch (err) {
        if (err.name === 'UnauthorizedError') {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
}
//body:
/* {
	ticketId: number,
	cardData: {
		issuer: string,
        number: number,
        name: string,
        expirationDate: Date,
        cvv: number
	}
} */
export async function postTicketPayment (req: AuthenticatedRequest, res: Response) {
    const {ticketId, cardData} = req.body;
    const userId = req.userId;
    
    try {
        if(!cardData || !ticketId){
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        //Retorno quando ticketId não existe
        const findTicket = await ticketService.getTicket(userId);
        if(!findTicket){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        //Retorno quando usuário não possui o ticketId 401
        /* const findTicketByUserId = await ticketService.getEnrollment(findTicket.enrollmentId);
        if(findTicketByUserId.userId !== userId){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        } */
        //const findTicket = await ticketService.getTicket(userId);
        //////////////////////////////////
        /* if(findTicket.ticketTypeId !==ticketId){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        } */
        const paidTicket = await ticketPaymentService.createTicketPayment(ticketId, cardData, userId);
        return res.status(httpStatus.OK).send(paidTicket); 
      } catch (err) {
        if (err.name === 'UnauthorizedError') {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
      }
}