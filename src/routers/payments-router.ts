import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketPayment, postTicketPayment } from '@/controllers'; 
import { ticketPaymentSchema } from '@/schemas';   

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getTicketPayment)
  .post('/process', validateBody(ticketPaymentSchema), postTicketPayment);
 
//export default paymentsRouter;
export {paymentsRouter};