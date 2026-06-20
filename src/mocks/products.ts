const MAIS_PEDIDOS = [
  { id: 1, title: "Tapioca de Carne de Sol", description: "Massa fininha com bastante queijo coalho e carne de sol desfiada.", price: 24.90, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Cuscuz Completo", description: "Cuscuz no vapor com ovo caipira, queijo coalho e charque.", price: 18.50, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Escondidinho de Macaxeira", description: "Creme de macaxeira gratinado com queijo e recheio de carne seca.", price: 32.00, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Baião de Dois", description: "Arroz, feijão de corda, queijo coalho, bacon e carne de sol.", price: 45.00, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Moqueca de Camarão", description: "Camarões frescos no azeite de dendê, leite de coco e coentro.", price: 68.00, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1559058789-672da06263d8?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Acarajé", description: "Bolinho de feijão fradinho frito no dendê, com vatapá e camarão seco.", price: 22.00, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" },
];

const COMBOS = [
  { id: 9, title: "Combo Casal Nordestino", description: "1 Baião de Dois + 1 Cuscuz Completo + 2 Sucos de Cajá.", price: 79.90, category: "Combos", imageUrl: "https://images.unsplash.com/photo-1544025162-81111420d4d7?auto=format&fit=crop&w=800&q=80" },
];

const BEBIDAS = [
  { id: 7, title: "Guaraná Antarctica", description: "Lata 350ml bem gelada.", price: 6.00, category: "Bebidas", imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80" },
  { id: 8, title: "Suco de Cajá", description: "Copo de 500ml de suco natural da polpa de cajá.", price: 12.00, category: "Bebidas", imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80" }
];

export const MOCK_PRODUCTS = {
  "Todos": [...MAIS_PEDIDOS, ...COMBOS, ...BEBIDAS],
  "Mais Pedidos": MAIS_PEDIDOS,
  "Combos": COMBOS,
  "Bebidas": BEBIDAS
};
