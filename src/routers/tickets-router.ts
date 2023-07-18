import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketType, getTicket, postTicket } from '@/controllers'; 
import { ticketSchema } from '@/schemas';   

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketType)
  .get('/', getTicket)
  .post('/', validateBody(ticketSchema), postTicket);
 
export { ticketsRouter };