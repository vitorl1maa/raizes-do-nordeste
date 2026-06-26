export interface ProductAdditional {
  id: number;
  name: string;
  price: number;
}

export interface ProductDetail {
  id?: number;
  weight?: string;
  servings?: string;
  prepTime?: string;
  ingredients: string[];
  allergens?: string[];
  additionals: ProductAdditional[];
  nutritionalInfo?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
}

export const PRODUCT_DETAILS: Record<number, ProductDetail> = {
  // Tapioca de Carne de Sol
  1: {
    weight: '280g',
    servings: '1 pessoa',
    prepTime: '15 min',
    ingredients: ['Goma de tapioca', 'Carne de sol desfiada', 'Queijo coalho', 'Manteiga de garrafa'],
    allergens: ['Leite'],
    additionals: [
      { id: 101, name: 'Queijo coalho extra', price: 4.00 },
      { id: 102, name: 'Ovo caipira', price: 3.00 },
      { id: 103, name: 'Banana da terra frita', price: 5.00 },
    ],
    nutritionalInfo: { calories: '420 kcal', protein: '28g', carbs: '38g', fat: '18g' },
  },
  // Cuscuz Completo
  2: {
    weight: '350g',
    servings: '1 pessoa',
    prepTime: '20 min',
    ingredients: ['Flocão de milho', 'Ovo caipira', 'Queijo coalho', 'Charque desfiado', 'Manteiga'],
    allergens: ['Ovos', 'Leite'],
    additionals: [
      { id: 104, name: 'Charque extra', price: 6.00 },
      { id: 105, name: 'Ovo caipira extra', price: 3.00 },
      { id: 106, name: 'Carne de sol desfiada', price: 7.00 },
    ],
    nutritionalInfo: { calories: '380 kcal', protein: '22g', carbs: '42g', fat: '14g' },
  },
  // Escondidinho de Macaxeira
  3: {
    weight: '450g',
    servings: '1-2 pessoas',
    prepTime: '25 min',
    ingredients: ['Macaxeira (aipim)', 'Carne seca desfiada', 'Queijo mussarela', 'Creme de leite', 'Cebola', 'Alho'],
    allergens: ['Leite'],
    additionals: [
      { id: 107, name: 'Gratinado extra', price: 4.00 },
      { id: 108, name: 'Bacon crocante', price: 5.00 },
      { id: 109, name: 'Catupiry', price: 4.50 },
    ],
    nutritionalInfo: { calories: '520 kcal', protein: '32g', carbs: '45g', fat: '22g' },
  },
  // Baião de Dois
  4: {
    weight: '500g',
    servings: '1-2 pessoas',
    prepTime: '30 min',
    ingredients: ['Arroz', 'Feijão de corda', 'Queijo coalho', 'Bacon', 'Carne de sol', 'Manteiga de garrafa', 'Coentro'],
    allergens: ['Leite'],
    additionals: [
      { id: 110, name: 'Carne de sol extra', price: 10.00 },
      { id: 111, name: 'Queijo coalho extra', price: 4.00 },
      { id: 112, name: 'Vinagrete', price: 3.00 },
      { id: 113, name: 'Paçoca de carne', price: 6.00 },
    ],
    nutritionalInfo: { calories: '650 kcal', protein: '35g', carbs: '55g', fat: '30g' },
  },
  // Moqueca de Camarão
  5: {
    weight: '550g',
    servings: '2 pessoas',
    prepTime: '35 min',
    ingredients: ['Camarão rosa', 'Azeite de dendê', 'Leite de coco', 'Pimentão', 'Tomate', 'Coentro', 'Cebola'],
    allergens: ['Crustáceos', 'Leite de coco'],
    additionals: [
      { id: 114, name: 'Camarão extra (100g)', price: 15.00 },
      { id: 115, name: 'Arroz branco', price: 5.00 },
      { id: 116, name: 'Pirão', price: 6.00 },
      { id: 117, name: 'Farofa de dendê', price: 4.00 },
    ],
    nutritionalInfo: { calories: '480 kcal', protein: '38g', carbs: '25g', fat: '26g' },
  },
  // Acarajé
  6: {
    weight: '200g',
    servings: '1 pessoa',
    prepTime: '15 min',
    ingredients: ['Feijão fradinho', 'Azeite de dendê', 'Vatapá', 'Camarão seco', 'Salada'],
    allergens: ['Crustáceos'],
    additionals: [
      { id: 118, name: 'Vatapá extra', price: 4.00 },
      { id: 119, name: 'Camarão seco extra', price: 5.00 },
      { id: 120, name: 'Molho de pimenta', price: 2.00 },
    ],
    nutritionalInfo: { calories: '350 kcal', protein: '18g', carbs: '30g', fat: '20g' },
  },
  // Refrigerante 350ml
  7: {
    weight: '350ml',
    servings: '1 pessoa',
    prepTime: 'Pronta entrega',
    ingredients: ['Bebida gaseificada'],
    additionals: [],
    nutritionalInfo: { calories: '150 kcal', protein: '0g', carbs: '37g', fat: '0g' },
  },
  // Suco de Cajá
  8: {
    weight: '500ml',
    servings: '1 pessoa',
    prepTime: '5 min',
    ingredients: ['Polpa de cajá', 'Água', 'Açúcar'],
    additionals: [
      { id: 121, name: 'Sem açúcar', price: 0 },
      { id: 122, name: 'Leite condensado', price: 3.00 },
    ],
    nutritionalInfo: { calories: '180 kcal', protein: '1g', carbs: '42g', fat: '0g' },
  },
  // Combo Casal Nordestino
  9: {
    weight: '1.2kg',
    servings: '2 pessoas',
    prepTime: '30 min',
    ingredients: ['Baião de Dois completo', 'Cuscuz Completo', '2 Sucos de Cajá 500ml'],
    additionals: [
      { id: 123, name: 'Trocar suco por refrigerante', price: 0 },
      { id: 124, name: '+1 Suco extra', price: 10.00 },
    ],
    nutritionalInfo: { calories: '1100 kcal', protein: '58g', carbs: '98g', fat: '44g' },
  },
  // Carne de Sol com Macaxeira
  10: {
    weight: '600g',
    servings: '1-2 pessoas',
    prepTime: '25 min',
    ingredients: ['Carne de sol', 'Macaxeira frita', 'Cebola', 'Alho', 'Salada verde', 'Vinagrete'],
    allergens: [],
    additionals: [
      { id: 125, name: 'Carne de sol extra (150g)', price: 12.00 },
      { id: 126, name: 'Macaxeira frita extra', price: 5.00 },
      { id: 127, name: 'Queijo coalho grelhado', price: 6.00 },
      { id: 128, name: 'Farofa', price: 4.00 },
    ],
    nutritionalInfo: { calories: '720 kcal', protein: '45g', carbs: '50g', fat: '35g' },
  },
  // Bobó de Camarão
  11: {
    weight: '500g',
    servings: '1-2 pessoas',
    prepTime: '30 min',
    ingredients: ['Camarão', 'Aipim (macaxeira)', 'Leite de coco', 'Azeite de dendê', 'Coentro', 'Pimentão'],
    allergens: ['Crustáceos', 'Leite de coco'],
    additionals: [
      { id: 129, name: 'Camarão extra (100g)', price: 15.00 },
      { id: 130, name: 'Arroz branco', price: 5.00 },
      { id: 131, name: 'Pirão de peixe', price: 6.00 },
    ],
    nutritionalInfo: { calories: '550 kcal', protein: '36g', carbs: '35g', fat: '28g' },
  },
  // Rubacão Paraibano
  12: {
    weight: '500g',
    servings: '1-2 pessoas',
    prepTime: '25 min',
    ingredients: ['Arroz', 'Feijão verde', 'Queijo coalho', 'Carne de sol desfiada', 'Feijão de corda', 'Coentro'],
    allergens: ['Leite'],
    additionals: [
      { id: 132, name: 'Carne de sol extra', price: 10.00 },
      { id: 133, name: 'Queijo coalho extra', price: 4.00 },
      { id: 134, name: 'Vinagrete', price: 3.00 },
    ],
    nutritionalInfo: { calories: '580 kcal', protein: '32g', carbs: '52g', fat: '24g' },
  },
  // Paçoca de Carne de Sol
  13: {
    weight: '400g',
    servings: '1-2 pessoas',
    prepTime: '20 min',
    ingredients: ['Carne de sol desfiada', 'Farinha de mandioca', 'Cebola', 'Cebolinha', 'Manteiga de garrafa'],
    allergens: ['Leite'],
    additionals: [
      { id: 135, name: 'Feijão verde', price: 5.00 },
      { id: 136, name: 'Vinagrete', price: 3.00 },
      { id: 137, name: 'Banana frita', price: 4.00 },
    ],
    nutritionalInfo: { calories: '490 kcal', protein: '30g', carbs: '40g', fat: '22g' },
  },
  // Queijo Coalho na Brasa
  14: {
    weight: '250g',
    servings: '1-2 pessoas',
    prepTime: '10 min',
    ingredients: ['Queijo coalho', 'Mel', 'Orégano'],
    allergens: ['Leite'],
    additionals: [
      { id: 138, name: 'Mel extra', price: 2.00 },
      { id: 139, name: 'Melaço de cana', price: 3.00 },
      { id: 140, name: 'Geleia de pimenta', price: 3.50 },
    ],
    nutritionalInfo: { calories: '320 kcal', protein: '22g', carbs: '12g', fat: '20g' },
  },
  // Cartola
  15: {
    weight: '220g',
    servings: '1 pessoa',
    prepTime: '10 min',
    ingredients: ['Banana da terra', 'Queijo coalho', 'Açúcar', 'Canela em pó'],
    allergens: ['Leite'],
    additionals: [
      { id: 141, name: 'Sorvete de creme', price: 6.00 },
      { id: 142, name: 'Calda de chocolate', price: 4.00 },
      { id: 143, name: 'Doce de leite', price: 4.50 },
    ],
    nutritionalInfo: { calories: '380 kcal', protein: '12g', carbs: '45g', fat: '18g' },
  },
  // Mungunzá
  16: {
    weight: '350ml',
    servings: '1 pessoa',
    prepTime: '15 min',
    ingredients: ['Milho branco', 'Leite de coco', 'Açúcar', 'Canela', 'Cravo'],
    allergens: ['Leite de coco'],
    additionals: [
      { id: 144, name: 'Leite condensado', price: 3.00 },
      { id: 145, name: 'Canela extra', price: 1.00 },
    ],
    nutritionalInfo: { calories: '290 kcal', protein: '5g', carbs: '50g', fat: '8g' },
  },
  // Combo Sertanejo
  17: {
    weight: '800g',
    servings: '1-2 pessoas',
    prepTime: '25 min',
    ingredients: ['Carne de Sol', 'Macaxeira Frita', 'Feijão de corda', 'Salada verde', 'Suco 500ml'],
    additionals: [
      { id: 146, name: 'Trocar suco por refrigerante', price: 0 },
      { id: 147, name: 'Queijo coalho grelhado', price: 6.00 },
    ],
    nutritionalInfo: { calories: '850 kcal', protein: '48g', carbs: '65g', fat: '38g' },
  },
  // Combo Família Nordeste
  18: {
    weight: '2.5kg',
    servings: '4 pessoas',
    prepTime: '40 min',
    ingredients: ['Baião de Dois (porção família)', 'Escondidinho (porção família)', '4 Acarajés', '4 Sucos 500ml'],
    additionals: [
      { id: 148, name: 'Trocar sucos por refrigerantes', price: 0 },
      { id: 149, name: '+2 Acarajés extras', price: 18.00 },
      { id: 150, name: 'Queijo coalho (4 espetos)', price: 20.00 },
    ],
    nutritionalInfo: { calories: '3200 kcal', protein: '140g', carbs: '280g', fat: '120g' },
  },
  // Água de Coco
  19: {
    weight: '500ml',
    servings: '1 pessoa',
    prepTime: 'Pronta entrega',
    ingredients: ['Água de coco natural'],
    additionals: [],
    nutritionalInfo: { calories: '90 kcal', protein: '0g', carbs: '22g', fat: '0g' },
  },
  // Suco de Acerola
  20: {
    weight: '500ml',
    servings: '1 pessoa',
    prepTime: '5 min',
    ingredients: ['Polpa de acerola', 'Água', 'Açúcar'],
    additionals: [
      { id: 151, name: 'Sem açúcar', price: 0 },
      { id: 152, name: 'Leite condensado', price: 3.00 },
    ],
    nutritionalInfo: { calories: '160 kcal', protein: '2g', carbs: '38g', fat: '0g' },
  },
};
