
interface Form {
  nome: string;
  email: string;
  mensagem?: string[];
  cep: string;

}
function validateForm(form: Form): string {
  console.log('Validando formulário...', form);
  if (!form.nome || form.nome.length < 3) {
    return 'Nome inválido';
  }
  if (!form.email || form.email.indexOf('@') === -1) {
    return 'Email inválido';
  }
  if (!form.cep || form.cep.length !== 11) {
    return 'CEP inválido';
  }
  return 'Formulário válido';
}
export { validateForm };
