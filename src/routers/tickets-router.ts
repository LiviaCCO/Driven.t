import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketType, getTicket, postTicket } from '@/controllers'; 
import { ticketSchema } from '@/schemas';   

const tickets = Router();

tickets
  .all('/*', authenticateToken)
  .get('/tickets/types', getTicketType)
  .get('/tickets', getTicket)
  .post('/tickets', validateBody(ticketSchema), postTicket);
 
export { tickets };