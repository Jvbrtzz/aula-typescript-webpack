import { Form } from "./interface/formulario";

function validateForm(form: Form): string {
  const errorMsg: string[] = [];

  console.log("Validando formulário...", form);

  if (!form.nome || form.nome.trim().length < 3) {
    errorMsg.push("Nome inválido");
  }

  if (!form.email || form.email.indexOf("@") === -1) {
    errorMsg.push("Email inválido");
  }

  if (!form.cep) {
    errorMsg.push("CEP inválido");
  }

  if (errorMsg.length > 0) {
    return errorMsg.join(" | ");
  }

  return "Formulário válido";
}

export { validateForm };
