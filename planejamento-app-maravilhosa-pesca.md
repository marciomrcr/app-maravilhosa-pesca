# 📦 Planejamento de Aplicação Web com Automação (N8N, GPT, Stripe/ASAAS, Supabase)

## ✅ Objetivos do Projeto

1. Criar uma aplicação web para **gestão de produtos, clientes, pedidos e entregas**.
2. Automatizar o envio diário das listas de produtos via **WhatsApp** (N8N).
3. Criar um **atendente inteligente** (via GPT) para responder e efetuar vendas.
4. Permitir **pagamentos por Pix, cartão ou dinheiro**.
5. Garantir **entrega gratuita** no bairro Guamá.

---

## 🧠 Organização das Ideias por Módulo

### 1. Admin Web App (Next.js, Tailwind, Shadcn UI, TanStack Query, Zod, React Hook Form)

- Cadastro de **produtos** (com controle de promoções por dia da semana)
- Cadastro de **clientes** e **endereços**
- Gerenciamento de **estoques**
- Lançamento e visualização de **pedidos**
- Gestão de **entregas** com cálculo de taxa
- Visualização de **vendas por período**
- Painel com **indicadores** (produtos mais vendidos, faturamento, etc.)

---

### 2. Banco de Dados (Supabase + Prisma com RLS)

**Entidades principais:**

- `clientes`: nome, telefone, endereço(s)
- `enderecos`: bairro, rua, número, ponto de referência, taxa_entrega
- `produtos`: nome, descrição, categoria, unidade, preço, estoque, ativo
- `promocoes`: produto_id, dia_semana, preco_promocional
- `pedidos`: cliente_id, status, total, data, forma_pagamento, bairro_entrega
- `itens_pedido`: pedido_id, produto_id, quantidade, preco_unitario
- `vendas`: pedido_id, data, valor_pago, metodo_pagamento

---

### 3. Automação com N8N (Integração WhatsApp + GPT)

**Funções:**

- Enviar **mensagem automática diária** com produtos e promoções
- Atender mensagens usando um **agente GPT com contexto**
- Cadastrar **novos contatos** automaticamente (via webhook e Supabase)
- Finalizar pedidos automaticamente com **link de pagamento (Stripe/ASAAS)**

---

### 4. IA Vendedora (GPT via N8N)

- Integração com OpenAI API para responder dúvidas e apresentar produtos.
- Capacidade de:
  - Perguntar bairro → aplicar lógica da entrega
  - Gerar link de pagamento com valor correto
  - Encaminhar pedido para o sistema após confirmação
  - Confirmar dados de entrega

---

### 5. Integrações Externas

- **Stripe** ou **ASAAS** para:
  - Geração de link de pagamento Pix / Cartão
  - Recebimento e confirmação automática
- **WhatsApp (via N8N ou API externa como Z-API, UltraMSG, Twilio)**:
  - Envio de mensagens
  - Recebimento de mensagens
  - Conexão com chatbot via GPT

---

## 📋 Plano de Ação por Fases

### 🚀 Fase 1 — MVP Interno (sem IA)

- ✅ Backend + Frontend Admin
- ✅ Banco de Dados Supabase com Prisma
- ✅ Cadastro de produtos, promoções, clientes, pedidos
- ✅ Lógica de cálculo de entrega (bairro Guamá = grátis)
- ✅ Tela de resumo de pedidos + forma de pagamento (Pix, cartão, dinheiro)
- ✅ Visualização de pedidos e histórico

---

### 🤖 Fase 2 — Automação com N8N (WhatsApp + Tabelas)

- ✅ Envio automático de tabela diária
- ✅ Integração com Supabase via Webhooks (novos contatos)
- ✅ Layout dinâmico de mensagens com promoções do dia
- ✅ Separação da mensagem em:
  - Saudação
  - Promoção do dia
  - Lista completa (por categorias)

---

### 🧠 Fase 3 — IA Vendedora (GPT + Link de Pagamento)

- ✅ Atendente GPT treinado com contexto dos produtos e regras de entrega
- ✅ Automatização de pedidos com geração de link (Stripe ou ASAAS)
- ✅ Confirmar pagamento (via webhook do provedor)
- ✅ Inserção do pedido no sistema automaticamente

---

### 💳 Fase 4 — Integração de Pagamentos e Finalização

- ✅ Integração completa com Stripe ou ASAAS
- ✅ Confirmação de pagamento automático via Webhook
- ✅ Atualização de status do pedido para "Pago"
- ✅ Visualização no painel admin

---

## 📂 Organização do Projeto (Pastas Next.js)

```
/app
  /(public)
    layout.tsx        ← layout sem login (login, cadastro)
    login/page.tsx
    cadastro/page.tsx

  /(admin)
    layout.tsx        ← layout com sidebar e header
    dashboard/page.tsx
    produtos/page.tsx
    clientes/page.tsx
    pedidos/page.tsx
    entregas/page.tsx
    promocoes/page.tsx


/components
  /ui (Shadcn)
  /forms
  /cards
  /modals

/lib
  /utils
  /stripe (ou asaas)
  /n8n
  /supabase

/hooks
/schemas
/types
```

---

## 🔐 Regras de Negócio Críticas

- **Promoções por dia da semana** com preço específico
- **Entrega gratuita** somente para bairro Guamá
- **Taxas dinâmicas** conforme o bairro (armazenado por endereço)
- **Atualização de estoque** automática após venda
- \*\*Pedidos válidos somente após confirmação de pagamento

---

## 🛠️ Sugestões Técnicas

- **TanStack Query**: para cache otimizado nas listas de produtos e pedidos
- **Zod + React Hook Form**: para validações em todos os formulários
- **Supabase RLS**: proteção por row-level (ideal para multiusuário futuro)
- **Webhook da Stripe/ASAAS**: para automação da confirmação de pagamento
- **Shadcn UI**: estilização profissional e consistente
- **Crons no N8N**: envio diário da mensagem entre 8h-9h da manhã

---
