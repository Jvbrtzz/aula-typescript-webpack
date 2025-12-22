import axios from "axios";
import { RequestBuilder } from "../..";


export async function getCepInfo(cep: string) {
  const request = new RequestBuilder()
    .withUrl(`https://viacep.com.br/ws/${cep}/json/`)
    .withMethod('get');

  console.log("Método:", request.method);
  console.log("URL:", request.url);

  try {
    const response = await axios({
      url: request.url!,
      method: request.method!
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao consultar CEP:", error);
    return null;
  }
}


