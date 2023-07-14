import Joi from 'joi';

type ticketId = {
    ticketTypeId: number
}

export const ticketSchema = Joi.object<ticketId>({
    ticketTypeId: Joi.number().required(),
});

