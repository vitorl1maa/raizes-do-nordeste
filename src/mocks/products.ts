import carneSolMacaxeiraImg from '../assets/images/products/carne-sol-macaxeira.png';
import boboCamaraoImg from '../assets/images/products/bobo-camarao.png';
import cartolaImg from '../assets/images/products/cartola.png';
import pacocaCarneSolImg from '../assets/images/products/pacoca-carne-sol.png';
import mungunzaImg from '../assets/images/products/mungunza.png';
import aguaDeCocoImg from '../assets/images/products/agua-de-coco.png';
import sucoAcerolaImg from '../assets/images/products/suco-acerola.png';
import rubacaoImg from '../assets/images/products/rubacao.png';
import queijoCoalhoImg from '../assets/images/products/queijo-coalho-brasa.png';
import comboSertanejoImg from '../assets/images/products/combo-sertanejo.png';
import comboFamiliaImg from '../assets/images/products/combo-familia.png';
import comboCasalImg from '../assets/images/products/combo-casal-nordestino.png';

const MAIS_PEDIDOS = [
  { id: 1, title: "Tapioca de Carne de Sol", description: "Massa fininha com bastante queijo coalho e carne de sol desfiada.", price: 24.90, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Cuscuz Completo", description: "Cuscuz no vapor com ovo caipira, queijo coalho e charque.", price: 18.50, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Escondidinho de Macaxeira", description: "Creme de macaxeira gratinado com queijo e recheio de carne seca.", price: 32.00, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Baião de Dois", description: "Arroz, feijão de corda, queijo coalho, bacon e carne de sol.", price: 45.00, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Moqueca de Camarão", description: "Camarões frescos no azeite de dendê, leite de coco e coentro.", price: 68.00, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1559058789-672da06263d8?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Acarajé", description: "Bolinho de feijão fradinho frito no dendê, com vatapá e camarão seco.", price: 22.00, badge: "Mais Pedido", category: "Mais Pedidos", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" },
];

const PRATOS_PRINCIPAIS = [
  { id: 10, title: "Carne de Sol com Macaxeira", description: "Carne de sol acebolada com macaxeira frita crocante, salada e vinagrete.", price: 52.00, category: "Pratos Principais", imageUrl: carneSolMacaxeiraImg },
  { id: 11, title: "Bobó de Camarão", description: "Creme de aipim com camarões refogados no dendê e leite de coco.", price: 65.00, category: "Pratos Principais", imageUrl: boboCamaraoImg },
  { id: 12, title: "Rubacão Paraibano", description: "Arroz, feijão verde, queijo coalho, carne de sol e feijão de corda.", price: 42.00, category: "Pratos Principais", imageUrl: rubacaoImg },
  { id: 13, title: "Paçoca de Carne de Sol", description: "Carne de sol desfiada pilada com farinha de mandioca e cebola.", price: 38.00, category: "Pratos Principais", imageUrl: pacocaCarneSolImg },
];

const ENTRADAS = [
  { id: 14, title: "Queijo Coalho na Brasa", description: "Espetinhos de queijo coalho grelhado com mel e orégano.", price: 18.00, category: "Entradas", imageUrl: queijoCoalhoImg },
];

const SOBREMESAS = [
  { id: 15, title: "Cartola", description: "Banana da terra frita coberta com queijo coalho derretido e canela.", price: 19.90, category: "Sobremesas", imageUrl: cartolaImg },
  { id: 16, title: "Mungunzá", description: "Canjica cremosa de milho branco com leite de coco, canela e cravo.", price: 14.00, category: "Sobremesas", imageUrl: mungunzaImg },
];

const COMBOS = [
  { id: 9, title: "Combo Casal Nordestino", description: "1 Baião de Dois + 1 Cuscuz Completo + 2 Sucos de Cajá.", price: 79.90, category: "Combos", imageUrl: comboCasalImg },
  { id: 17, title: "Combo Sertanejo", description: "Carne de Sol + Macaxeira Frita + Feijão + Salada + Suco.", price: 54.90, category: "Combos", imageUrl: comboSertanejoImg },
  { id: 18, title: "Combo Família Nordeste", description: "Baião de Dois + Escondidinho + 4 Acarajés + 4 Sucos.", price: 149.90, badge: "p/ 4 pessoas", category: "Combos", imageUrl: comboFamiliaImg },
];

const BEBIDAS = [
  { id: 7, title: "Refrigerante 350ml", description: "Lata 350ml bem gelada.", price: 5.50, category: "Bebidas", imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80" },
  { id: 8, title: "Suco de Cajá", description: "Copo de 500ml de suco natural da polpa de cajá.", price: 12.00, category: "Bebidas", imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80" },
  { id: 19, title: "Água de Coco", description: "Copo de 500ml de água de coco natural gelada.", price: 8.00, category: "Bebidas", imageUrl: aguaDeCocoImg },
  { id: 20, title: "Suco de Acerola", description: "Copo de 500ml de suco natural de acerola. Rico em vitamina C.", price: 12.00, category: "Bebidas", imageUrl: sucoAcerolaImg },
];

export const MOCK_PRODUCTS = {
  "Todos": [...MAIS_PEDIDOS, ...PRATOS_PRINCIPAIS, ...ENTRADAS, ...SOBREMESAS, ...COMBOS, ...BEBIDAS],
  "Mais Pedidos": MAIS_PEDIDOS,
  "Pratos Principais": PRATOS_PRINCIPAIS,
  "Entradas": ENTRADAS,
  "Sobremesas": SOBREMESAS,
  "Combos": COMBOS,
  "Bebidas": BEBIDAS,
};
