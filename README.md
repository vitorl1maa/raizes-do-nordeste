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

## ⚒️ Tecnologias Utilizadas

- **React 19**
- **TypeScript**
- **TailwindCSS v4** (Estilização via utilitários)
- **Zustand** (Gerenciamento de Estado Centralizado para Carrinho, Autenticação, Produtos, Pedidos, etc.)
- **React Router v7** (Navegação PWA e rotas protegidas)
- **Lucide React** (Ícones SVG)
- **Vitest** (Testes)
- **Recharts** (Gráficos no Dashboard do Gerente)

## 🗺️ Estrutura de Páginas

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

Para realizar uma avaliação manual e formal da plataforma, o orientador deve seguir os fluxos objetivos abaixo:

### Cenário 1: Fluxo do Cliente
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
1. O usuário acessa o sistema com credenciais de **Atendente**.
2. Na tela de **Painel (Kanban)**, o atendente visualiza o pedido recém-criado pelo cliente na coluna "Em Preparo".
3. O atendente testa o fluxo operacional arrastando o pedido para as próximas etapas (ex: "Saiu para Entrega" e "Entregue"), validando a mudança de status em tempo real.

### Cenário 3: Fluxo do Gerente
1. O usuário acessa o sistema com credenciais de **Gerente**.
2. No **Dashboard**, visualiza os gráficos de métricas e faturamento.
3. Na aba de **Gestão de Cardápio**, testa a funcionalidade de habilitar ou desabilitar (ativo/inativo) produtos do estoque.

### Cenário 4: Fluxo de Totem
1. O usuário acessa a rota `/totem`.
2. Simula o fluxo de um cliente realizando uma compra rápida de autoatendimento em um terminal físico da loja, utilizando a interface otimizada para toque.

---
**Desenvolvido com foco em Arquitetura Limpa, Atomic Design e UX Premium.**
