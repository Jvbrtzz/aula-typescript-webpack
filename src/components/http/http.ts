import axios from "axios";

export async function getCepInfo(cep: string) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar CEP:", error);
    return null;
  }
}
