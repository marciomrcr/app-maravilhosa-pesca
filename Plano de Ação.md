# 1. Estrutura Inicial e Organização

- Crie uma pasta `components/ui` para o design system (botões, inputs, cards, modais, tabelas, etc).
- Crie uma pasta `features` para cada domínio:  
  `features/produtos`, `features/promocoes`, `features/movimentacao-estoque`.
- Crie uma pasta `app/(admin)/produtos`, `app/(admin)/promocoes`, `app/(admin)/movimentacao-estoque` para as páginas CRUD.

# 2. Design System

- Implemente componentes reutilizáveis:  
  `Button`, `Input`, `Select`, `Modal`, `Table`, `Card`, `Form`, etc.
- Use TailwindCSS para estilização e garanta responsividade.
- Crie temas claros/escuros e variações de cor.
- Documente os componentes para fácil reuso.

# 3. CRUD Produtos

## Backend:

- Crie rotas API RESTful em `app/api/produtos` para listar, criar, editar, deletar produtos.
- Use Prisma para manipulação dos dados.
- Implemente validação com Zod nos endpoints.

## Frontend:

- Crie página de listagem com busca, paginação e filtros.
- Crie formulário de cadastro/edição usando React Hook Form + Zod.
- Use TanStack Query para buscar e mutar dados.
- Implemente feedback visual (loading, erro, sucesso).

# 4. CRUD Promoções

## Backend:

- Rotas API em `app/api/promocoes` para CRUD de promoções.
- Validação com Zod.

## Frontend:

- Página de listagem de promoções vinculadas aos produtos.
- Formulário para criar/editar promoções.
- Integração com TanStack Query.

# 5. CRUD Movimentação de Estoque

## Backend:

- Rotas API em `app/api/movimentacao-estoque`.
- Validação com Zod.

## Frontend:

- Página de listagem de movimentações (entrada/saída).
- Formulário para registrar movimentação.
- Atualização automática do estoque do produto.
- Integração com TanStack Query.

# 6. Boas Práticas

- Separe lógica de negócio dos componentes visuais.
- Use hooks customizados para abstrair chamadas de API e lógica de formulário.
- Implemente feedback visual consistente (modais, toasts, loaders).
- Garanta acessibilidade nos componentes.
- Escreva testes unitários para hooks e componentes críticos.

# 7. Modernidade e Responsividade

- Use animações suaves (ex: `tw-animate-css`).
- Garanta que o layout funcione bem em mobile e desktop.
- Utilize ícones modernos (ex: Lucide).

# 8. Documentação e Manutenção

- Documente o design system e os principais hooks.
- Mantenha o código limpo e modular.
- Utilize ESLint e Prettier para padronização.
