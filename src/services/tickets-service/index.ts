async function getTicketType(){

}

async function getTicket(){

}

async function createTicket(){

}

const ticketsService = {
    getTicketType,
    getTicket,
    createTicket
  };
  
export default ticketsService;

/* async function getAddressFromCEP(cep: string): Promise<AddressEnrollment> {
    const result = await request.get(`${process.env.VIA_CEP_API}/${cep}/json/`);
  
    if (!result.data || result.data.erro) {
      throw notFoundError();
    }
  
    const { bairro, localidade, uf, complemento, logradouro } = result.data;
  
    const address: AddressEnrollment = {
      bairro,
      cidade: localidade,
      uf,
      complemento,
      logradouro,
    };
  
    return address;
} */