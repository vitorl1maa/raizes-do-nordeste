<div align="center">
  <img src="src/assets/images/raizes-logo.png" alt="Raízes do Nordeste Logo" width="500"/>
</div>

# Raízes do Nordeste - Delivery App

Raízes do Nordeste é um sistema de pedidos e delivery multicanal (Desktop, Mobile, e Totem) especializado em culinária nordestina. O projeto permite que os clientes façam pedidos de pratos típicos, utilizem cupons, participem de um programa de fidelidade, e que os funcionários (atendentes e gerentes) gerenciem pedidos e cardápios em tempo real.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18+) e o **npm** instalados na sua máquina.

### Passos de Instalação e Execução

1. **Clone o repositório ou acesse a pasta do projeto:**
   ```bash
   cd raizes-do-nordeste
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   *O aplicativo será aberto no seu navegador padrão em `http://localhost:5173`.*

4. **Para rodar os testes unitários:**
   ```bash
   npm run test
   ```

5. **Para build de produção:**
   ```bash
   npm run build
   ```

## 🛠 Tecnologias Utilizadas

- **React 19**
- **TypeScript**
- **TailwindCSS v4** (Estilização via utilitários)
- **Zustand** (Gerenciamento de Estado Centralizado para Carrinho, Autenticação, Produtos, Pedidos, etc.)
- **React Router v7** (Navegação PWA e rotas protegidas)
- **Lucide React** (Ícones SVG)
- **Vitest** (Testes)
- **Recharts** (Gráficos no Dashboard do Gerente)

## 🗺 Estrutura de Páginas

A aplicação é dividida em diferentes contextos de usuário:

- **Público / Cliente (Client-Facing)**
  - `/cardapio` (ou `/`): Vitrine principal de produtos e categorias.
  - `/produto/:id`: Detalhes do prato, ingredientes, informações nutricionais, alérgenos e adicionais.
  - `/checkout`: Sacola de compras, seleção de entrega/retirada, modal de endereço via API ViaCEP e pagamento.
  - `/acompanhamento`: Tela de acompanhamento do status do pedido em tempo real.
  - `/promocoes`: Cupons de desconto ativáveis.
  - `/fidelidade`: "Clube Raízes" - Saldo de pontos, progressão e resgate de recompensas (Sobremesas, bebidas, descontos).
  - `/perfil`: Edição de conta, avatares personalizáveis e opção de exclusão.
  
- **Painel Administrativo (Staff)**
  - `/painel`: Dashboard do **Atendente** para acompanhamento da fila de preparo (Kanban de pedidos).
  - `/gerente`: Dashboard do **Gerente** exibindo métricas gráficas e faturamento horário.
  - `/gerente/cardapio`: Gerenciamento completo de produtos (Ativar/Desativar itens por unidade).

- **Físico (In-Store)**
  - `/totem`: Interface touch-friendly e de alta usabilidade para tótens de autoatendimento na loja física.

## 🧪 Cenários de Testes e Navegação Recomendada

Para realizar uma avaliação manual e formal da plataforma, o orientador pode acessar os links de produção, utilizar as credenciais fornecidas e seguir os fluxos objetivos abaixo, ou conferir as gravações de tela (vídeos):

### Cenário 1: Fluxo do Cliente (Site do Restaurante)
- **Link de Acesso:** [Acessar Cardápio](https://raizes-do-nordeste-flax.vercel.app/cardapio)
- **Demonstração em Vídeo:**
  <video src="src/assets/videos/cardapio.mp4" controls width="100%"></video>

**Como testar (Explicação):**
1. A primeira tela com a qual o usuário se depara é a tela de **Cardápio**.
2. O usuário pode escolher um **Cupom** para aplicar no momento da compra.
3. O usuário pode acessar o Clube Raízes e **resgatar uma bebida grátis e um desconto de R$ 10** para uma determinada compra.
4. Para realizar a compra, o usuário seleciona um **prato, uma bebida e uma sobremesa**, adicionando-os ao carrinho.
5. Em seguida, o usuário clica em **Finalizar Pedido**.
6. O usuário deve escolher o método de entrega:
   - **Entrega no endereço:** sendo necessário preencher CEP, Rua, Número, Complemento, Bairro e Cidade.
   - **Retirada na loja**.
7. O usuário escolhe a forma de pagamento: **PIX ou Cartão de Crédito**.
8. O usuário **confirma o pedido**.
9. O pedido é processado e o usuário é redirecionado para a **tela de Acompanhamentos**, onde consegue monitorar o status do pedido em tempo real.

### Cenário 2: Fluxo do Atendente
- **Link de Acesso:** [Acessar Painel de Atendimento](https://raizes-do-nordeste-flax.vercel.app/atendimento)
- **Credenciais:** 
  - Usuário: `atend`
  - Senha: `atend@2026`
- **Demonstração em Vídeo:**
  <video src="src/assets/videos/atendimento.mp4" controls width="100%"></video>

**Como testar (Explicação):**
1. O usuário acessa o link de atendimento e faz o login com as credenciais fornecidas.
2. Na tela de **Painel (Kanban)**, o atendente visualiza o pedido recém-criado pelo cliente na coluna "Em Preparo".
3. O atendente testa o fluxo operacional arrastando (drag and drop) o pedido para as próximas etapas (ex: "Saiu para Entrega" e "Entregue"), validando a mudança de status do pedido.

### Cenário 3: Fluxo do Gerente
- **Link de Acesso:** [Acessar Dashboard Gerencial](https://raizes-do-nordeste-flax.vercel.app/gerente/dashboard)
- **Credenciais:** 
  - Usuário: `gerencia`
  - Senha: `gen@2026`
- **Demonstração em Vídeo:**
  <video src="src/assets/videos/gerencia.mp4" controls width="100%"></video>

**Como testar (Explicação):**
1. O usuário acessa o link e insere as credenciais de Gerente.
2. No **Dashboard**, visualiza os gráficos de métricas financeiras, ticket médio e volume de pedidos por hora.
3. Na aba de **Gestão de Cardápio**, o gerente testa a funcionalidade de habilitar ou desabilitar (ativo/inativo) a exibição de produtos no estoque para a loja principal.

### Cenário 4: Fluxo de Totem
- **Link de Acesso:** [Acessar Totem de Autoatendimento](https://raizes-do-nordeste-flax.vercel.app/totem)
- **Demonstração em Vídeo:**
  <video src="src/assets/videos/totem.mp4" controls width="100%"></video>

**Como testar (Explicação):**
1. O usuário acessa a rota destinada ao totem físico da loja.
2. Simula o fluxo de um cliente realizando uma compra rápida de autoatendimento, utilizando uma interface otimizada para toque (botões largos, categorias agrupadas verticalmente e processo de checkout simplificado).

---
**Desenvolvido com foco em Arquitetura Limpa, Atomic Design e UX Premium.**
