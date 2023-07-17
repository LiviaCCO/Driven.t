import { invalidDataError, notFoundError } from '@/errors';
import { prisma } from '@/config';
import {TicketStatus} from '@prisma/client';

async function getTicketType(){
    return prisma.ticketType.findMany(); 
}

async function getTicket(userId:number){
    if (!userId) throw notFoundError();
    const enrollment = await prisma.enrollment.findFirst({
        where: { userId }
    });
    if (!enrollment) throw notFoundError();
    const enrollmentId = enrollment.id;
    const ticket = await prisma.ticket.findFirst({
        where: { enrollmentId }
    });
    if (!ticket) throw notFoundError();
    const id = ticket.ticketTypeId;
    const ticketType = await prisma.ticketType.findFirst({
        where: { id }
    });
    //Resposta esperada:
    /* {
        id: number,
        status: string, //RESERVED | PAID
        ticketTypeId: number,
        enrollmentId: number,
        TicketType: {
            id: number,
            name: string,
            price: number,
            isRemote: boolean,
            includesHotel: boolean,
            createdAt: Date,
            updatedAt: Date,
        },
        createdAt: Date,
        updatedAt: Date,
    } */
    return { 
        ticket,
        TicketType:{ticketType}
    };
}
type newTickets = {
    ticketTypeId: number;
    enrollmentId: number;
    status: String;
}
async function createTicket(ticket: number, userId: number): Promise<newTickets>{
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
    const newTicket = {
        ticketTypeId: ticketType.id,
        enrollmentId: enrollment.id,
        status: TicketStatus.RESERVED,
    };
    console.log(newTicket)
    return await prisma.ticket.create({
        data: newTicket,
    });
}

const ticketService = {
    getTicketType,
    getTicket,
    createTicket,
  };
  
export default ticketService;

