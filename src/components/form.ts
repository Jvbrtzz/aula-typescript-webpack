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
      cepHTMLTrue();
      event.preventDefault();
      const formData = {
        nome: nomeInput ? nomeInput.value : "",
        email: emailInput ? emailInput.value : "",
        mensagem: mensagemInput ? [mensagemInput.value] : undefined,
        cep: cepInput ? cepInput.value : "",
      };

      validate(formData as any);
      cepHTMLFalse()
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

async function validate(formData: {nome: string, email: string, cep: string, rua: string, message?: string}): void {
  const errorDiv = document.querySelector("#error-messages") as HTMLElement;

  const validationMsg = validateForm(formData);

  errorDiv.style.color = "red";
  errorDiv.textContent = "";

  if (validationMsg !== "Formulário válido") {
    errorDiv.textContent = validationMsg;
    writeUserData(' ', ' ', ' ',' ', ' ');
    return;
  }

  const iscep = await fetchCepData(formData.cep);
      let rua = "";
      if (iscep) {
        const cepData = await getCepInfo(formData.cep);
        rua = cepData?.logradouro || "";
      }

  errorDiv.style.color = "green";
  errorDiv.textContent = "Formulário válido!";
  writeUserData(formData.nome, formData.email, formData.cep, rua, formData.message ? formData.message : "");

}

function writeUserData(nome: string, email: string, cep: string, rua: string, message?: string): void {
  if (nome && email && cep) {
    const nomeItem = document.querySelector("#user-name") as HTMLElement;
    const emailItem = document.querySelector("#user-email") as HTMLElement;
    const messageItem = document.querySelector("#user-message") as HTMLElement;
    const cepItem = document.querySelector("#user-cep") as HTMLElement;
    const ruaItem = document.querySelector("#user-rua") as HTMLElement;

    nomeItem.textContent = nome;
    emailItem.textContent = email;
    if (message) {
      messageItem.textContent = message;
    }
    cepItem.textContent = cep;
    ruaItem.textContent = rua;
  } else {
    console.log("Dados incompletos para preencher o formulário.");
  }
}


function cepHTMLTrue():void {
  const cepMessageElement = document.querySelector(".cep") as HTMLElement;

  if (!cepMessageElement) return;
  cepMessageElement.style.display = "block";
}
function cepHTMLFalse():void {
  const cepMessageElement = document.querySelector(".cep") as HTMLElement;

  if (!cepMessageElement) return;
  cepMessageElement.style.display = "none";
}

export { getFormInfo };
