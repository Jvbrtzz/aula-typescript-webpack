import { externalFunction } from "./components/mod";
import { getFormInfo } from "./components/form";

getFormInfo();

const nome: string = "João";
let idade: number = 26;
console.log(`Olá, ${nome}!`);
console.log(`Você tem ${idade} anos.`);

//tipo generics
let array: Array<number> = [1, 2, 3, 4, 5];
//tipo normal
let array2: number[] = [1, 2, 3, 4, 5];
for (let i = 0; i < 5; i++) {
  array.push(array2[i]);
  console.log(`Array[${i}]:`, array[i]);
}
console.log("Array:", array);

function soma(a: number, b: number): number {
  return a + b;
}

console.log("Soma de 2 e 3 é:", soma(2, 3));

//Objeto com interface
interface Pessoa {
  nome: string;
  idade: number;
  hobbies?: string[];
  [key: string | number]: unknown; //Propriedade dinâmica
  endereco?: {
    rua: string;
    numero: number;
  };
  saudacao(): string;
  saudacaComVoId(): void;
}
const pessoa: Pessoa = {
  nome: "João Silva",
  idade: 26,
  hobbies: ["programar", "ler", "jogar futebol"],
  endereco: { rua: "Rua das Flores", numero: 123 },
  altura: 1.75, //Propriedade dinâmica
  saudacao() {
    return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
  },
  saudacaComVoId() {
    console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  },
};

const pessoa2: Pessoa = {
  nome: "Maria Souza",
  idade: 30,
  peso: 65, //Propriedade dinâmica
  saudacao() {
    return `Oi, eu sou a ${this.nome} e tenho ${this.idade} anos.`;
  },
  saudacaComVoId() {
    console.log(`Oi, eu sou a ${this.nome} e tenho ${this.idade} anos.`);
  },
};

//Outro objeto(sem tipagem explícita)
const aluno = {
  nome: "tESTE",
  idade: 22,

  saudacao(): string {
    return `Oi, eu sou a ${this.nome} e tenho ${this.idade} anos.`;
  },
  saudacaComVoId(): void {
    console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  },
};
externalFunction(aluno.nome);

console.log("Objeto pessoa:", pessoa);
console.log(pessoa.saudacao());
console.log("Hobbies:", (pessoa.hobbies ?? []).join(", "));
console.log("Rua:", pessoa.endereco?.rua ?? "não informado");

//Função void
function exibirMensagem(...args: string[]): void {
  console.log("Mensagem:", args.join(" - "));
}

exibirMensagem("Olá", "isso é uma função void", "em TypeScript");

//Array
function imprimirArray(...args: number[]): number {
  return args.reduce((acc, val) => acc * val, 1);
}

console.log("Imprimir array:", imprimirArray(1, 2, 3, 4, 5));

//tipo null e undefined
let x;
if (typeof x === "undefined") x = 20;
console.log(x * 2);

export function squareOf(x: any): number | null {
  if (typeof x === "number") return x * x;
  return null;
}

const squareOfTwoString = squareOf("2");

if (squareOfTwoString === null) {
  console.log("Conta inválida");
} else {
  console.log(squareOfTwoString * 100);
}
//tipo enum
enum Cor {
  Vermelho,
  Verde,
  Azul,
}
enum Cor {
  Amarelo = 5,
  Preto,
  Branco,
}
let minhaCor: Cor = Cor.Branco;
let minhaCor2: Cor = Cor.Azul;
console.log("Minha cor é:", Cor[minhaCor]);
console.log("Minha cor é:", Cor[minhaCor2]);

//tipo any e unknown
let valorAny: any = 10;
valorAny = "uma string";
//valorAny = true;

let valorUnknown: unknown = 15;
valorUnknown = "outra string";
valorUnknown = false;

//Operação com any
let resultadoAny = valorAny + 5; // permitido, mas pode causar erros em tempo de execução
console.log("Resultado any:", resultadoAny);

//Operação com unknown (é necessário fazer uma verificação de tipo)
let resultadoUnknown: number;
if (typeof valorUnknown === "number") {
  resultadoUnknown = valorUnknown + 5;
  console.log("Resultado unknown:", resultadoUnknown);
} else {
  console.log("Não é possível realizar a operação, valorUnknown não é um número.");
}

//union type
function exibirNota(nota: number | string): void {
  console.log(`A nota é: ${nota}`);
}
exibirNota(10);
exibirNota("dez");

function somaouconcatena(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else {
    return a.toString() + b.toString();
  }
}

console.log("Soma ou concatenação:", somaouconcatena(5, 10));
console.log("Soma ou concatenação:", somaouconcatena("Olá, ", "mundo!"));

//type alias
type ID = number | string;

function exibirID(id: ID): void {
  console.log(`O ID é: ${id}`);
}

exibirID(101);
exibirID("202A");

//intersection types
interface A {
  propA: string;
}

interface B {
  propB: number;
}

type AB = A & B;

const objetoAB: AB = {
  propA: "Valor A",
  propB: 42,
};

console.log("Objeto AB:", objetoAB);

type TemNome = { nome: string };
type TemIdade = { idade: number };

type PessoaCompleta = TemNome & TemIdade;

const pessoaCompleta: PessoaCompleta = {
  nome: "Carlos",
  idade: 28,
};

console.log("Pessoa Completa:", pessoaCompleta);

//funções como tipos
type OperacaoMatematica = (x: number, y: number) => number;

const multiplicar: OperacaoMatematica = (x, y) => x * y;
const dividir: OperacaoMatematica = (x, y) => x / y;

console.log("Multiplicação:", multiplicar(6, 3));
console.log("Divisão:", dividir(6, 3));

//tipagem estruturada
interface Veiculo {
  rodas: number;
  acelerar(): void;
}

class Carro implements Veiculo {
  rodas: number;
  func: void;

  constructor(rodas: number) {
    this.rodas = rodas;
    this.func = externalFunction(`Carro criado com ${rodas} rodas`);
  }
  acelerar(): void {
    console.log("O carro está acelerando com", this.rodas, "rodas.");
  }
}

const meuCarro = new Carro(4);
meuCarro.func;
meuCarro.acelerar();

// Manipulação segura do DOM: criar e anexar elementos corretamente
const body = document.querySelector("body") as HTMLBodyElement | null;
if (body) {
  body.style.background = "red";
  const h1 = document.createElement("h1");
  h1.textContent = "Conteúdo criado dinamicamente";
  body.appendChild(h1);
}

const body2 = document.querySelector("body");
if (body2) {
  (body2 as HTMLElement).style.background = "blue";
}

// Evite usar non-null assertion (!) sem checar; faça a verificação
const body3 = document.querySelector("body");
if (body3) {
  (body3 as HTMLElement).style.background = "white";
  const newH1 = document.querySelector("h1");
  if (newH1) newH1.innerHTML = "Formulario";
}


class Calculadora {
  constructor(private _numero: number) {}

  get numero(): number {
    return this._numero;
  }

  set numero(n: number) {
    this._numero = n;
  }

  add(n: number) {
    this.numero += n;
    return this;
  }
}

const cal = new Calculadora(10)
cal.add(10).add(10);
console.log(cal)

// Builder - GoF
export class RequestBuilder {
  private _method: 'get' | 'post' | null = null;
  private _url: string | null = null;

  // setter moderno
  set method(method: 'get' | 'post') {
    this._method = method;
  }

  // getter moderno
  get method(): 'get' | 'post' | null {
    return this._method;
  }

  // setter moderno
  set url(url: string | null) {
    this._url = url;
  }

  // getter moderno
  get url(): string | null {
    return this._url;
  }

  // método de builder (para encadeamento)
  withMethod(method: 'get' | 'post'): this {
    this.method = method;
    return this;
  }

  withUrl(url: string): this {
    this.url = url;
    return this;
  }

  send(): string | null {
    console.log(`Enviando dados via ${this.method} para ${this.url}`);
    return this.url;
  }
}

const request = new RequestBuilder(); // Builder
request.withUrl('http://www.google.com').withMethod('get').send();

//generics
type FilterCallback<U> = (value: U) => boolean;

export function meuFilter<T>(array: T[], callbackfn: FilterCallback<T>): T[] {
  const novoArray = [];

  for (let i = 0; i < array.length; i++) {
    if (callbackfn(array[i])) {
      novoArray.push(array[i]);
    }
  }

  return novoArray;
}

const arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const arrayFiltradoOriginal = arrayNumbers.filter((value) => value < 5);
console.log(arrayFiltradoOriginal);

const arrayFiltrado = meuFilter(arrayNumbers, (value) => value < 5);
console.log(arrayFiltrado);

//required e partial e pick
interface Produto {
  nome: string;
  preco: number;
  descricao?: string;
}

function atualizarProduto(
  produto: Produto,
  atualizacoes: Partial<Produto>
): Produto {
  return { ...produto, ...atualizacoes };
}

const produto: Produto = {
  nome: "Camiseta",
  preco: 29.99,
};

const produtoAtualizado = atualizarProduto(produto, {
  preco: 24.99,
  descricao: "Camiseta de algodão",
});

console.log("Produto atualizado:", produtoAtualizado);

function criarProduto(produto: Required<Produto>): Produto {
  return produto;
}

const novoProduto = criarProduto({
  nome: "Calça",
  preco: 59.99,
  descricao: "Calça jeans",
});

console.log("Novo produto:", novoProduto);

function exibirNomeProduto(produto: Pick<Produto, "nome">): void {
  console.log("Nome do produto:", produto.nome);
}

exibirNomeProduto({ nome: "Tênis" });

//extract e exclude
type ABC = "A" | "B" | "C";
type AC = Extract<ABC, "A" | "C">; // "A" | "C"
type C = Exclude<ABC, "A" | "B">; // "C"

//pick com exclude e keyof
interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

type DadosPublicosUsuario = Pick<
  Usuario,
  Exclude<keyof Usuario, "senha">
>;

const usuario: DadosPublicosUsuario = {
  id: 1,
  nome: "Ana",
  email: "ana@email.com"
} ;

console.log("Dados públicos do usuário:", usuario);

type Linguagem = 'TypeScript' | 'JavaScript' | 'Python' | 'Java';

class Votacao {
  private static total: { votos: number; linguagem: Linguagem }[] = [];

  static votarJa(linguagem: Linguagem): void {
    const votoExistente = this.total.find(
      item => item.linguagem === linguagem
    );

    if (votoExistente) {
      votoExistente.votos += 1;
    } else {
      this.total.push({ linguagem, votos: 1 });
    }
  }

  static getVotos(): {}[] {
    return this.total;
  }
}

Votacao.votarJa('TypeScript');
Votacao.votarJa('JavaScript');
Votacao.votarJa('Python');
Votacao.votarJa('Java');
Votacao.votarJa('Java');

console.log(Votacao.getVotos());

class Votacao2 {
  private static total: { votos: number; linguagem: string }[] = [];
  private linguagem: string[] = [];
  private qtde!: number;

  addOpcao(linguagem: string, qtde: number): void {
    this.linguagem.push(linguagem);
    this.qtde = qtde;
    Votacao2.total.push({ linguagem, votos: qtde });
  }

  votarJa(linguagem: string, qtde: number): void {
    const votoExistente = Votacao2.total.find(
      item => item.linguagem === linguagem
    );
    console.log(votoExistente)
    if (votoExistente) {
      votoExistente.votos += qtde;
    }else {
      console.log(linguagem + " não está entre as opções de voto.");

    }
  }

  static getVotos(): {}[] {
    return Votacao2.total;
  }

}

const votacao = new Votacao2();
votacao.addOpcao('TypeScript', 0);
votacao.addOpcao('JavaScript', 0);
votacao.addOpcao('Python', 0);
votacao.addOpcao('Java', 0);

votacao.votarJa('Java', 1);
votacao.votarJa('Java', 1);
votacao.votarJa('Java', 1);
votacao.votarJa('Python', 1);
votacao.votarJa('GO', 1);

console.log(Votacao2.getVotos());

//this em funções normais e arrow functions
const person = {
  name: "Alice",
  age: 28,
}

function fullNamefn(this: any){
  return `Full name is: ${this.name} and age is: ${this.age}`;
}

const boundFullName = fullNamefn.bind(person);


const fullNameArrow = () => `Full name is: ${person.name} and age is: ${person.age}`;

console.log(boundFullName());
console.log(fullNameArrow());

const Usuario = {
  pontos: 20,
  ganhou: function() {
    this.pontos++;
  }
}
Usuario.ganhou();
console.log("Pontos do usuário:", Usuario.pontos);
