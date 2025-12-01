import { validateForm } from "./validator";
import { getCepInfo } from "../components/http/http";

function getFormInfo(): string | void {
  const form = document.querySelector("form") as HTMLFormElement;
  if (form) {
    const nomeInput = form.querySelector('input[name="nome"]') as HTMLInputElement;
    const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement | null;
    const mensagemInput = form.querySelector('textarea[name="mensagem"]') as HTMLTextAreaElement | null;
    const cepInput = form.querySelector('input[name="cep"]') as HTMLInputElement;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = {
        nome: nomeInput ? nomeInput.value : "",
        email: emailInput ? emailInput.value : "",
        mensagem: mensagemInput ? [mensagemInput.value] : undefined,
        cep: cepInput ? cepInput.value : "",
      };
      const iscep = await fetchCepData(formData.cep);
      let rua = "";
      if (iscep) {
        const cepData = await getCepInfo(formData.cep);
        rua = cepData?.logradouro || "";
      }
      if (iscep) {
        console.log("cep válido.");
      }
      writeUserData(formData.nome, formData.email, formData.mensagem ? formData.mensagem[0] : "", formData.cep, rua);
      validateForm(formData);
      console.log("Dados do formulário:", formData);
      console.log("Formulário enviado!");
    });
  } else {
    console.log("Formulário não encontrado no DOM.");
  }
}

async function fetchCepData(cep: string): Promise<boolean> {
  const data = await getCepInfo(cep);
  if (data) {
    console.log("Dados do cep:", data);
    return true;
  } else {
    console.log("Nenhum dado encontrado para o cep fornecido.");
    return false;
  }
}

function writeUserData(nome: string, email: string, message: string, cep: string, rua: string): void {
  if (nome && email && message && cep) {
    const nomeItem = document.querySelector("#user-name") as HTMLElement;
    const emailItem = document.querySelector("#user-email") as HTMLElement;
    const messageItem = document.querySelector("#user-message") as HTMLElement;
    const cepItem = document.querySelector("#user-cep") as HTMLElement;
    const ruaItem = document.querySelector("#user-rua") as HTMLElement;

    nomeItem.textContent = nome;
    emailItem.textContent = email;
    messageItem.textContent = message;
    cepItem.textContent = cep;
    ruaItem.textContent = rua;
  } else {
    console.log("Dados incompletos para preencher o formulário.");
  }
}

export { getFormInfo };
