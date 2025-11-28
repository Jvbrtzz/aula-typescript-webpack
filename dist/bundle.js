/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/mod.ts":
/*!********************!*\
  !*** ./src/mod.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.externalFunction = externalFunction;
function externalFunction(data) {
    console.log(data, 'from externalFunction');
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.squareOf = squareOf;
const mod_1 = __webpack_require__(/*! ./mod */ "./src/mod.ts");
const nome = "João";
let idade = 26;
console.log(`Olá, ${nome}!`);
console.log(`Você tem ${idade} anos.`);
//tipo generics
let array = [1, 2, 3, 4, 5];
//tipo normal
let array2 = [1, 2, 3, 4, 5];
for (let i = 0; i < 5; i++) {
    array.push(array2[i]);
    console.log(`Array[${i}]:`, array[i]);
}
console.log("Array:", array);
function soma(a, b) {
    return a + b;
}
console.log("Soma de 2 e 3 é:", soma(2, 3));
const pessoa = {
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
    }
};
const pessoa2 = {
    nome: "Maria Souza",
    idade: 30,
    peso: 65, //Propriedade dinâmica
    saudacao() {
        return `Oi, eu sou a ${this.nome} e tenho ${this.idade} anos.`;
    },
    saudacaComVoId() {
        console.log(`Oi, eu sou a ${this.nome} e tenho ${this.idade} anos.`);
    }
};
//Outro objeto(sem tipagem explícita)
const aluno = {
    nome: "tESTE",
    idade: 22,
    saudacao() {
        return `Oi, eu sou a ${this.nome} e tenho ${this.idade} anos.`;
    },
    saudacaComVoId() {
        console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
    }
};
(0, mod_1.externalFunction)(aluno.nome);
console.log("Objeto pessoa:", pessoa);
console.log(pessoa.saudacao());
console.log("Hobbies:", (pessoa.hobbies ?? []).join(", "));
console.log("Rua:", pessoa.endereco?.rua ?? "não informado");
//Função void
function exibirMensagem(...args) {
    console.log("Mensagem:", args.join(" - "));
}
exibirMensagem("Olá", "isso é uma função void", "em TypeScript");
//Array
function imprimirArray(...args) {
    return args.reduce((acc, val) => acc * val, 1);
}
console.log("Imprimir array:", imprimirArray(1, 2, 3, 4, 5));
//tipo null e undefined
let x;
if (typeof x === 'undefined')
    x = 20;
console.log(x * 2);
function squareOf(x) {
    if (typeof x === 'number')
        return x * x;
    return null;
}
const squareOfTwoString = squareOf('2');
if (squareOfTwoString === null) {
    console.log('Conta inválida');
}
else {
    console.log(squareOfTwoString * 100);
}
//tipo enum
var Cor;
(function (Cor) {
    Cor[Cor["Vermelho"] = 0] = "Vermelho";
    Cor[Cor["Verde"] = 1] = "Verde";
    Cor[Cor["Azul"] = 2] = "Azul";
})(Cor || (Cor = {}));
(function (Cor) {
    Cor[Cor["Amarelo"] = 5] = "Amarelo";
    Cor[Cor["Preto"] = 6] = "Preto";
    Cor[Cor["Branco"] = 7] = "Branco";
})(Cor || (Cor = {}));
let minhaCor = Cor.Branco;
let minhaCor2 = Cor.Azul;
console.log("Minha cor é:", Cor[minhaCor]);
console.log("Minha cor é:", Cor[minhaCor2]);
//tipo any e unknown
let valorAny = 10;
valorAny = "uma string";
//valorAny = true;
let valorUnknown = 15;
valorUnknown = "outra string";
valorUnknown = false;
//Operação com any
let resultadoAny = valorAny + 5; // permitido, mas pode causar erros em tempo de execução
console.log("Resultado any:", resultadoAny);
//Operação com unknown (é necessário fazer uma verificação de tipo)
let resultadoUnknown;
if (typeof valorUnknown === 'number') {
    resultadoUnknown = valorUnknown + 5;
    console.log("Resultado unknown:", resultadoUnknown);
}
else {
    console.log("Não é possível realizar a operação, valorUnknown não é um número.");
}
//union type
function exibirNota(nota) {
    console.log(`A nota é: ${nota}`);
}
exibirNota(10);
exibirNota("dez");
function somaouconcatena(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    else {
        return a.toString() + b.toString();
    }
}
console.log("Soma ou concatenação:", somaouconcatena(5, 10));
console.log("Soma ou concatenação:", somaouconcatena("Olá, ", "mundo!"));
function exibirID(id) {
    console.log(`O ID é: ${id}`);
}
exibirID(101);
exibirID("202A");
const objetoAB = {
    propA: "Valor A",
    propB: 42
};
console.log("Objeto AB:", objetoAB);
const pessoaCompleta = {
    nome: "Carlos",
    idade: 28
};
console.log("Pessoa Completa:", pessoaCompleta);
const multiplicar = (x, y) => x * y;
const dividir = (x, y) => x / y;
console.log("Multiplicação:", multiplicar(6, 3));
console.log("Divisão:", dividir(6, 3));
class Carro {
    constructor(rodas) {
        this.rodas = rodas;
        this.func = (0, mod_1.externalFunction)(`Carro criado com ${rodas} rodas`);
    }
    acelerar() {
        console.log("O carro está acelerando com", this.rodas, "rodas.");
    }
}
const meuCarro = new Carro(4);
meuCarro.func;
meuCarro.acelerar();
// Manipulação segura do DOM: criar e anexar elementos corretamente
const body = document.querySelector('body');
if (body) {
    body.style.background = 'red';
    body.innerHTML = 'Alterado com type assertion';
    const h1 = document.createElement('h1');
    h1.textContent = 'Conteúdo criado dinamicamente';
    body.appendChild(h1);
}
const body2 = document.querySelector('body');
if (body2) {
    body2.style.background = 'blue';
}
// Evite usar non-null assertion (!) sem checar; faça a verificação
const body3 = document.querySelector('body');
if (body3) {
    body3.style.background = 'white';
    const newH1 = document.querySelector('h1');
    if (newH1)
        newH1.innerHTML = 'Conteúdo da nova div';
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map