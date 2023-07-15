import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketPayment, postTicketPayment } from '@/controllers'; 
import { ticketPaymentSchema } from '@/schemas';   

const payments = Router();

payments
  .all('/*', authenticateToken)
  .get('/payments?ticketId=1', getTicketPayment)
  .post('/payments/process', validateBody(ticketPaymentSchema), postTicketPayment);
 
export { payments };