## Vite

### O que é o Vite?

Vite (palavra francesa para "rápido", pronunciada / vit /, como "veet") é uma nova espécie de ferramenta de construção de front-end que melhora significativamente a experiência de desenvolvimento de front-end.

A construção padrão visa navegadores que suportam ESM nativo por meio de tags de script e importação dinâmica de ESM nativo. 

### Pq usar o Vite?

Consiste em duas partes principais:

Um servidor de desenvolvimento que atende seus arquivos de origem por meio de módulos ES nativos, com recursos integrados e surpreendentemente rápido Hot Module Replacement (HMR).

Um comando de construção que agrupa seu código com Rollup, pré-configurado para gerar ativos estáticos altamente otimizados para produção.

Em resumo é bem performático

### Como Iniciar um projeto com Vite

```bash
## baixar template
$ yarn create vite <app-name> --template <template-name>

## Instalar dependências
$ yarn

## Rodar aplicação
$ yarn dev
```

[Reference](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

[Templates Disponíveis](https://github.com/vitejs/awesome-vite#templates)

- import default
- ordem de importação

## CSS module

- nome do arquivo: <nome-do-arquivo>.module.<extensão>
- importando no componente:
```ts
import <qualquer-nome> from '<path-do-arquivo>'
```