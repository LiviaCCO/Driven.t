import { invalidDataError, notFoundError } from '@/errors';
import { prisma } from '@/config';

async function getTicketPayment(userId:number, ticketId: number){
    if (!userId) throw notFoundError();
    if (!ticketId) throw notFoundError();
    const payment = await prisma.payment.findFirst({
        where: { ticketId }
    });
    return payment
    //deve retornar:
    /* {
        id: number,
        ticketId: number,
        value: number,
        cardIssuer: string, //VISA | MASTERCARD
        cardLastDigits: string,
        createdAt: Date,
        updatedAt: Date,
    } */
}

///////////////////////

type card = {
		issuer: string;
        number: number;
        name: string;
        expirationDate: Date;
        cvv: number
} 
type newPayment = {
    id: number;
    ticketId: number;
    value: number;
    cardIssuer: string; // VISA | MASTERCARD
    cardLastDigits: string;
    createdAt: Date;
    updatedAt: Date
}

async function createTicketPayment(ticketId: number, cardData: card, userId: number): Promise<newPayment>{
    const ticketType = await prisma.ticketType.findFirst({
        where: {
            id: ticket
        }
    })
    if (!ticketType) throw notFoundError();
    const enrollment = await prisma.enrollment.findFirst({
        where: { userId }
    });
    if (!enrollment) throw notFoundError();
    const priceTicket = (await ticketService.getTicket(userId)).ticketType.price;
    const newPay = {
        ticketId,
        value: priceTicket,
        cardIssuer: card.issuer,
        cardLastDigits: card.number.toString.slice(-4)
    };
    const paidTicket = await prisma.payment.create({
        data: newPay
    });
    const paidTicket = await prisma.ticket.update({
        where: {id: ticketId},
        data: {status: "PAID"}
    });
    return paidTicket;
}

const ticketPaymentService = {
    getTicketPayment,
    createTicketPayment
};
  
export default ticketPaymentService;