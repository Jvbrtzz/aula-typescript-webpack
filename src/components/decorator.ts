//decorator
@inverte
class Animal {
  nome: string;
  constructor(nome: string) {
    this.nome = nome;
  }
}

@inverte
class Ave {
  nome: string;
  constructor(nome: string) {
    this.nome = nome;
  }
}

@caixaalta
class Pessoa {
  nome: string;
  constructor(nome: string) {
    this.nome = nome;
  }
}


function inverte<T extends { new (...args: any[]): {} }>(target: T) {
  console.log('TARGET::',target)

  return class extends target {
    nome: string;
    idade: number;
    cor: string;
    peso: number;

    constructor(...args: any[]) {
      console.log('ARGS::', ...args)
      super(...args);
      this.cor = "preto";
      this.peso = 10;

      this.nome = this.invertstring(args[0]);
      this.idade = this.idadeString(args[1]);
    }

    falar = () => {
      console.log(`O animal ${this.nome} está falando!`);
    };
    idadeString = (value: number) => {
      return parseInt(value.toString());
    }
    invertstring = (value: string) => {
      return value.split("").reverse().join("");
    }
  };
}

function caixaalta<T extends { new (...args: any[]): {} }>(target: T) {
  return class extends target {
    idade: number;
    constructor(...args: any[]) {
      super(...args);

      this.nome = this.aumentar(args[0]);
      this.idade = this.idadeString(args[1]);
    }
    falar = () => {
      console.log(`O animal ${this.nome} está falando!`);
    };
    idadeString = (value: number) => {
      return parseInt(value.toString());
    }
    aumentar = (value: string) => {
      return value.toUpperCase();
    }
  };
}

const cachorro = new Animal("Rex", 5) as any;
console.log(`Idade do cachorro: ${cachorro.idade} e nome: ${cachorro.nome}`, cachorro.peso, cachorro.cor);

const papagaio = new Ave("Louro", 3) as any;
console.log(`Idade do papagaio: ${papagaio.idade} e nome: ${papagaio.nome}`, papagaio.peso, papagaio.cor);

const pessoa = new Pessoa("João", 30) as any;
console.log(`Idade da pessoa: ${pessoa.idade} e nome: ${pessoa.nome}`);

//method decorator
function congelar(
  alvo: any,
  nomePropriedade: string,
  descritor: PropertyDescriptor
) {
  console.log(alvo);
  console.log(nomePropriedade);
  console.log(descritor);

  descritor.writable = false;
}

class Votacao {
  private static total: { votos: number; linguagem: string }[] = [];
  private linguagem: string[] = [];
  private qtde!: number;

  addOpcao(linguagem: string, qtde: number): void {
    this.linguagem.push(linguagem);
    this.qtde = qtde;
    Votacao.total.push({ votos: qtde, linguagem: linguagem });
  }

  @congelar
  votar(linguagem: string): void {
    const opcao = Votacao.total.find((op) => op.linguagem === linguagem);
    if (opcao) {
      opcao.votos += 1;
    }
  }

  static getVotos(): { votos: number; linguagem: string }[] {
    return Votacao.total;
  }
}

const votacao = new Votacao();
votacao.addOpcao("JavaScript", 5);
votacao.addOpcao("TypeScript", 3);
votacao.addOpcao("Python", 2);

votacao.votar("JavaScript");
votacao.votar("TypeScript");
votacao.votar("Python");
votacao.votar("JavaScript");

// Tentativa de modificar o método votar (não terá efeito devido ao decorador congelar)
// (votacao.votar as any) = function (linguagem: string) {
//   console.log("Método votar modificado!");
// };

votacao.votar("JavaScript");
votacao.votar("TypeScript");
votacao.votar("Python");

//------------------------------------------------------------------------------------------//

// Tipo do construtor da classe
type Constructor = new (...args: any[]) => any;

// Classes
function decoradorDeClasse(construtor: Constructor): any {
  // Chamado na criação da classe
  console.log('CLASSE');
  console.log(construtor);
  console.log('###');

  // Retorno pode ser omitido
  return class extends construtor {
    // faça o que desejar
  };
}

// Método de instância (normal)
function decoradorDeMetodo(
  prototipoDaClasse: any,
  nomeDoMetodo: string,
  descritorDePropriedade: PropertyDescriptor,
): any {
  // Chamado na criação do método (não precisa chamar o método)
  console.log('MÉTODO NORMAL');
  console.log(prototipoDaClasse);
  console.log(nomeDoMetodo);
  console.log(descritorDePropriedade);
  console.log('###');

  // Retorno pode ser omitido
  return {
    // value altera o retorno original:
    // value: (...args: any[]) => console.log(args),
    writable: true,
    enumerable: true,
    configurable: true,
  };
}

// Método estático
function decoradorDeMetodoEstatico(
  classConstructor: Constructor,
  nomeDoMetodo: string,
  descritorDePropriedade: PropertyDescriptor,
): any {
  // Chamado na criação do método (não precisa chamar o método)
  console.log('MÉTODO ESTÁTICO');
  console.log(classConstructor);
  console.log(nomeDoMetodo);
  console.log(descritorDePropriedade);
  console.log('###');

  // Retorno pode ser omitido
  return {
    // Use get/set OU value
    enumerable: true,
    configurable: true,
  };
}

// Parâmetro de método
function decoradorDeParametroDeMetodo(
  prototipoDaClasse: any,
  nomeDoMetodo: string,
  indiceDaPropriedade: number,
): any {
  // Chamado na criação do método
  console.log('PARÂMETRO DE MÉTODO');
  console.log(prototipoDaClasse);
  console.log(nomeDoMetodo);
  console.log(indiceDaPropriedade);
  console.log('###');

  // Retorno é ignorado
}

// Parâmetro de método estático
function decoradorDeParametroDeMetodoEstatico(
  classConstructor: Constructor,
  nomeDoMetodo: string,
  indiceDaPropriedade: number,
): any {
  // Chamado na criação do parâmetro (não precisa chamar o método)
  console.log('PARÂMETRO DE MÉTODO ESTÁTICO');
  console.log(classConstructor);
  console.log(nomeDoMetodo);
  console.log(indiceDaPropriedade);
  console.log('###');

  // Retorno é ignorado
}

// Propriedade
function decoradorDePropriedade(
  prototipoDaClasse: any,
  nomePropriedade: string,
): any {
  // Chamado na criação da propriedade
  console.log('DECORADOR DE PROPRIEDADE');
  console.log(prototipoDaClasse);
  console.log(nomePropriedade);
  console.log('###');

  // Retorno pode ser omitido
  // Use get e set para manipular o valor da propriedade
  let valorPropriedade: any;
  return {
    enumerable: true,
    configurable: true,
    get: () => valorPropriedade,
    set: (valor: any) => {
      if (typeof valor === 'string') {
        valorPropriedade = valor.split('').reverse().join('');
        return;
      }
      valorPropriedade = valor;
    },
  };
}

// Propriedade estática
function decoradorDePropriedadeEstatica(
  classConstructor: any,
  nomePropriedade: string,
): any {
  // Chamado na criação da propriedade estática
  console.log('DECORADOR DE PROPRIEDADE ESTÁTICA');
  console.log(classConstructor);
  console.log(nomePropriedade);
  console.log('###');

  // Retorno pode ser omitido
  return {
    // Use get/set OU value
    enumerable: true,
    configurable: true,
  };
}

// Getter/Setter
function decoradorDeGetterESetterNormal(
  prototipoDaClasse: any,
  nomePropriedade: string,
  descritorDePropriedade: PropertyDescriptor,
): any {
  // Chamado na criação do método
  // (só pode ser aplicado no getter ou no setter - não em ambos)
  console.log('GETTER/SETTER normal');
  console.log(prototipoDaClasse);
  console.log(nomePropriedade);
  console.log(descritorDePropriedade);
  console.log('###');

  // Retorno pode ser omitido
  return {
    // Use get/set OU value
    enumerable: true,
    configurable: true,
  };
}

// Getter/Setter estático
function decoradorDeGetterESetterEstatico(
  classConstructor: Constructor,
  nomePropriedade: string,
  descritorDePropriedade: PropertyDescriptor,
): any {
  // Chamado na criação do método
  // (só pode ser aplicado no getter ou no setter - não em ambos)
  console.log('GETTER/SETTER estático');
  console.log(classConstructor);
  console.log(nomePropriedade);
  console.log(descritorDePropriedade);
  console.log('###');

  // Retorno pode ser omitido
  return {
    // Use get/set OU value
    enumerable: true,
    configurable: true,
  };
}

// A classe e o uso dos decorators

@decoradorDeClasse
export class UmaPessoa {
  @decoradorDePropriedade
  nome: string;
  sobrenome: string;
  idade: number;

  @decoradorDePropriedadeEstatica
  static propriedadeEstatica = 'VALOR PROPRIEDADE ESTÁTICA';

  constructor(nome: string, sobrenome: string, idade: number) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.idade = idade;
  }

  @decoradorDeMetodo
  metodo(@decoradorDeParametroDeMetodo msg: string): string {
    return `${this.nome} ${this.sobrenome}: ${msg}`;
  }

  @decoradorDeMetodoEstatico
  static metodoEstatico(
    @decoradorDeParametroDeMetodoEstatico msg: string,
  ): string {
    return UmaPessoa.propriedadeEstatica + ' - ' + msg;
  }

  get nomeCompleto(): string {
    return this.nome + ' ' + this.sobrenome;
  }

  @decoradorDeGetterESetterNormal
  set nomeCompleto(valor: string) {
    const palavras = valor.split(/\s+/g);
    const primeiroNome = palavras.shift();
    if (!primeiroNome) return;
    this.nome = primeiroNome;
    this.sobrenome = palavras.join(' ');
  }

  @decoradorDeGetterESetterEstatico
  static get staticPropertyGetterSetter(): string {
    return UmaPessoa.propriedadeEstatica;
  }

  static set staticPropertyGetterSetter(value: string) {
    UmaPessoa.propriedadeEstatica = value;
  }
}

// Uso da classe

const pessoa = new UmaPessoa('Luiz', 'Otávio', 30);
pessoa.nomeCompleto = 'João Silva Oliveira';
const metodo = pessoa.metodo('Olá mundo!');
const metodoEstatico = UmaPessoa.metodoEstatico('Olá mundo!');
console.log(pessoa);
console.log(metodo);
console.log(metodoEstatico);
console.log(UmaPessoa.propriedadeEstatica);
