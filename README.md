Projeto TypeScript — Instruções Rápidas

Este repositório contém um exemplo mínimo para começar a desenvolver com TypeScript.

1) Abordagem recomendada (fácil — CommonJS)

- Objetivo: evitar problemas com módulos ESM e `ts-node` durante o desenvolvimento.
- Passos (PowerShell):

```
# Inicializar npm (se ainda não fez)
npm init -y

# Instalar dependências de desenvolvimento
npm install -D typescript ts-node @types/node

# Gerar tsconfig padrão
npx tsc --init

# Criar estrutura e arquivo de exemplo
mkdir src
ni src\index.ts
# Adicione no `src/index.ts` por exemplo:
# console.log('Olá TypeScript');

# Executar direto com ts-node (modo dev)
npm run dev

# Para gerar o arquivo JS compilado no .dist
npx tsc

# Para rodar o arquivo JS compilado no .dist
node .\dist\index.js (se não existir um script para isso)
```


- Exemplo mínimo de `tsconfig.json` recomendado para CommonJS:

```
{
	"compilerOptions": {
		"target": "ES2020",
		"module": "CommonJS",
		"outDir": "dist",
		"rootDir": "src",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true
	}
}
```

- Scripts úteis para adicionar em `package.json`:

```
"scripts": {
	"build": "tsc",
	"start": "node dist/index.js",
	"dev": "npx ts-node src/index.ts"
}
```

Vantagens: simples, funciona com Code Runner e `ts-node` sem configurações ESM extras.

2) Abordagem moderna (ESM)

- Objetivo: usar módulos ES nativos (`import`/`export`). Requer configurações adicionais.
- Passos (PowerShell):

```
npm init -y
npm install -D typescript ts-node @types/node
npx tsc --init
```

- Ajustes importantes:
	- Em `package.json`: adicionar `"type": "module"`
	- Em `tsconfig.json`: usar `"module": "ES2020"` ou `"NodeNext"`
	- Para `ts-node` com ESM, ativar em `tsconfig.json`:

```
"ts-node": { "esm": true }
```

- Exemplos de execução ESM (dependendo da versão do ts-node):

```
node --loader ts-node/esm ./src/index.ts
# ou, se sua versão do ts-node fornecer wrapper:
npx ts-node-esm src/index.ts
```

Nota: sem o loader/config correto, o Node lançará erros como "Unknown file extension '.ts'".

3) Configuração do Code Runner (VS Code)

- Exemplo de configuração em `.vscode/settings.json` para rodar TypeScript com `npx ts-node`:

```
{
	"code-runner.runInTerminal": true,
	"code-runner.saveFileBeforeRun": true,
	"code-runner.executorMap": {
		"typescript": "npx ts-node --files ${file}"
	}
}
```

4) Explicação dos erros comuns que você encontrou

- Warning: "To load an ES module, set \"type\": \"module\" in the package.json or use the .mjs extension"
	- Isso aparece quando o Node está em modo CommonJS por padrão e encontra código que usa sintaxe de módulos ES.
	- Solução: ou passar para ESM (adicionando `"type": "module"`) ou usar CommonJS no `tsconfig`.

- Error: "Unknown file extension '.ts'"
	- Ocorre quando Node tenta executar um arquivo `.ts` sem o loader/transpiler (ts-node ESM) configurado.
	- Solução: usar `ts-node` configurado para ESM, ou executar o arquivo transpilado (`node dist/index.js`).

5) Próximos passos — sugestões

- Se deseja a opção mais simples (recomendada para começar): eu posso automaticamente:
	- criar `src/index.ts` com um exemplo
	- ajustar `tsconfig.json` para `module: CommonJS`
	- adicionar scripts `dev`/`build` em `package.json`

- Se preferir ESM, eu posso ajustar `package.json`, `tsconfig.json` e mostrar o comando exato que o Code Runner deve usar.

Se quiser, eu já aplico as mudanças no repositório (criar o arquivo `src/index.ts` e os scripts). Diga qual abordagem prefere: "CommonJS" ou "ESM".
