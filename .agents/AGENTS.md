🚨 LEIA ESTE DOCUMENTO ANTES DE QUALQUER IMPLEMENTAÇÃO

Este documento define as regras arquiteturais, padrões de desenvolvimento, organização de código e princípios de design do projeto.

TODO agente, desenvolvedor ou ferramenta de IA DEVE consultar este arquivo antes de criar, modificar ou remover qualquer código.

Nenhuma implementação deve ser iniciada sem verificar as diretrizes descritas aqui.

Projeto

Nome: Raízes do Nordeste

Descrição:

Plataforma web responsiva para uma rede de lanchonetes nordestinas.

A solução contempla:

Catálogo de produtos
Cardápio por unidade
Pedidos online
Checkout
Integração com pagamento externo
Programa de fidelidade
Promoções
LGPD
Painel operacional
Painel administrativo
Modo Totem
Princípios Obrigatórios
1. Mobile First

Toda interface deve ser projetada inicialmente para dispositivos móveis.

A adaptação para tablet e desktop deve ocorrer posteriormente.

Sempre considerar:

Touch targets adequados
Performance mobile
Layout responsivo
Navegação simplificada
2. Atomic Design

Toda a estrutura visual deve seguir Atomic Design.

Nenhum componente deve ser criado fora dessa hierarquia.

Atoms

Componentes básicos.

Exemplos:

Button
Input
Label
Icon
Badge
Avatar
Divider
Typography
Spinner
Checkbox
Radio
Switch
Molecules

Combinações de Atoms.

Exemplos:

SearchInput
ProductPrice
QuantitySelector
FormField
UserAvatarInfo
CouponInput
LoyaltyBadge
Organisms

Blocos completos da interface.

Exemplos:

Header
ProductCard
ProductGrid
ProductFilters
CartSummary
CheckoutForm
OrderTimeline
PromotionBanner
LoyaltyPanel
Templates

Estruturas de layout.

Exemplos:

CustomerTemplate
CheckoutTemplate
DashboardTemplate
KitchenTemplate
KioskTemplate

Templates não possuem regras de negócio.

Pages

Representação final das telas.

Exemplos:

HomePage
MenuPage
ProductPage
CartPage
CheckoutPage
OrderTrackingPage
LoyaltyPage
AdminDashboardPage

Pages apenas orquestram componentes.

Estrutura de Pastas
src/

├── components/
│
├── atoms/
├── molecules/
├── organisms/
├── templates/
│
├── pages/
│
├── features/
│
├── services/
│
├── hooks/
│
├── contexts/
│
├── stores/
│
├── types/
│
├── constants/
│
├── utils/
│
├── assets/
│
├── styles/
│
└── tests/
Separação de Responsabilidades
Componentes

Devem ser puros.

Não devem:

chamar APIs
acessar banco
acessar localStorage diretamente
possuir regras de negócio complexas
Features

Toda regra de negócio deve ficar em:

src/features

Exemplos:

features/cart
features/orders
features/auth
features/payment
features/loyalty
features/promotions
Services

Responsáveis por comunicação externa.

Exemplos:

auth.service.ts
orders.service.ts
payment.service.ts
loyalty.service.ts
Design System
Cores
Primary
#FF4B16
Primary Dark
#D83A0D
Secondary
#FFD447
Background
#FFF7F0
Surface
#FFFFFF
Text
#121212
Text Secondary
#6B625C
Success
#2E7D32
Error
#D32F2F
Tipografia

Preferência:

Inter
Poppins
Manrope
Espaçamento

Utilizar escala:

4
8
12
16
24
32
48
64

Nunca utilizar valores arbitrários.

Border Radius

Utilizar:

8
12
16
24
32
Ícones

Preferencialmente:

Lucide
Heroicons

Evitar múltiplas bibliotecas.

Acessibilidade

Obrigatório:

Navegação por teclado
Labels em inputs
Contraste AA
Estados de foco visíveis
aria-label quando necessário
Hierarquia correta de headings
LGPD

Toda funcionalidade relacionada a dados pessoais deve considerar:

Consentimento explícito
Política de privacidade
Exclusão de dados
Preferências de comunicação
Transparência no uso de dados

Nenhuma coleta de dados deve ocorrer sem justificativa.

Performance

Prioridades:

Lazy Loading
Code Splitting
Memoização quando necessário
Evitar renderizações desnecessárias
Componentes reutilizáveis
Convenções de Código
Componentes
PascalCase

Exemplo:

ProductCard.tsx
CheckoutForm.tsx
Hooks
useSomething

Exemplo:

useCart
useAuth
useCheckout
Arquivos utilitários
camelCase

Exemplo:

formatCurrency.ts
calculateDiscount.ts
Antes de Implementar

Todo agente deve responder internamente às seguintes perguntas:

Estou seguindo Atomic Design?
O componente pertence ao nível correto?
Existe componente reutilizável antes de criar outro?
Estou respeitando Mobile First?
Estou respeitando o Design System?
Existe impacto em LGPD?
Existe impacto em acessibilidade?
Existe impacto em performance?

Se alguma resposta for negativa, a implementação deve ser revisada.

Regra Final

Antes de criar qualquer arquivo:

Ler este AGENTS.md.
Verificar a arquitetura existente.
Reutilizar componentes existentes.
Manter consistência visual e estrutural.
Não criar novas convenções sem necessidade.

Este documento possui prioridade sobre preferências individuais de implementação.