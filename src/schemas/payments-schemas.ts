import Joi from 'joi';

type ticketPayment = {
	ticketId: number;
	cardData: {
		issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number
	}
}

export const ticketPaymentSchema = Joi.object<ticketPayment>({
    ticketId: Joi.number().required(),
    cardData: {
		issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.number().required()
	}
});