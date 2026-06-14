import { Category, Product, DeliveryArea, Promotion, SystemSettings } from "@/types";

export const initialCategories: Category[] = [
  { id: "cat-sopas", name: "Sopas", slug: "sopas" },
  { id: "cat-caldos", name: "Caldos", slug: "caldos" },
  { id: "cat-jantas", name: "Jantas", slug: "jantas" },
  { id: "cat-bebidas", name: "Bebidas", slug: "bebidas" },
  { id: "cat-adicionais", name: "Adicionais", slug: "adicionais" }
];

export const initialProducts: Product[] = [
  // Sopas
  {
    id: "p-sopa-frango",
    name: "Sopa de Frango com Legumes",
    slug: "sopa-de-frango-com-legumes",
    description: "Sopa super nutritiva com peito de frango desfiado, cenoura, batata, chuchu e macarrão, temperada com ervas finas.",
    ingredients: "Frango desfiado, batata, cenoura, chuchu, cebola, alho, macarrão espaguete, cheiro verde e temperos naturais.",
    price: 18.00,
    imageUrl: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-sopas"
  },
  {
    id: "p-sopa-carne",
    name: "Sopa de Carne com Macarrão",
    slug: "sopa-de-carne-com-macarrao",
    description: "Deliciosa sopa de carne bovina cozida lentamente com legumes selecionados e macarrão padre nosso.",
    ingredients: "Carne bovina (acém/músculo), macarrão padre nosso, cenoura, abóbora, batata, alho, cebola e coentro.",
    price: 20.00,
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-sopas"
  },
  {
    id: "p-sopa-feijao",
    name: "Sopa de Feijão com Charque",
    slug: "sopa-de-feijao-com-charque",
    description: "Clássica sopa de feijão mulatinho batido, pedaços generosos de charque, bacon e macarrão.",
    ingredients: "Feijão mulatinho, carne de charque, bacon, macarrão espaguete, alho, cebola, louro e cominho.",
    price: 19.50,
    imageUrl: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-sopas",
    isPromotional: true
  },

  // Caldos
  {
    id: "p-caldo-verde",
    name: "Caldo Verde Tradicional",
    slug: "caldo-verde-tradicional",
    description: "Cremoso caldo de batatas com couve cortada fininha e rodelas de calabresa defumada.",
    ingredients: "Batata, couve-manteiga, calabresa defumada, azeite de oliva, alho e cebola.",
    price: 15.00,
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-caldos"
  },
  {
    id: "p-caldo-kenga",
    name: "Caldo de Kenga",
    slug: "caldo-de-kenga",
    description: "Caldo encorpado de mandioca com milho verde, frango desfiado e bacon crocante por cima.",
    ingredients: "Mandioca (macaxeira), frango desfiado, milho verde, bacon, cheiro verde e alho.",
    price: 16.00,
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-caldos",
    isPromotional: true
  },

  // Jantas
  {
    id: "p-cuscuz-completo",
    name: "Cuscuz Completo com Charque",
    slug: "cuscuz-completo-com-charque",
    description: "Cuscuz nordestino quentinho com manteiga, recheado de charque desfiada acebolada e ovos.",
    ingredients: "Flocão de milho, manteiga da terra, charque desfiada, cebola roxa e ovo frito.",
    price: 17.00,
    imageUrl: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-jantas"
  },
  {
    id: "p-macarronada",
    name: "Macarronada de Carne Moída",
    slug: "macarronada-de-carne-moida",
    description: "Espaguete ao molho pomodoro caseiro com carne moída bem temperada e queijo ralado.",
    ingredients: "Macarrão espaguete, carne moída bovina, molho de tomate artesanal, alho, manjericão e queijo parmesão.",
    price: 19.00,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-jantas"
  },

  // Bebidas
  {
    id: "p-coca-lata",
    name: "Coca-Cola Lata 350ml",
    slug: "coca-cola-lata-350ml",
    description: "Refrigerante Coca-Cola original lata de 350ml trincando de gelada.",
    ingredients: "Conteúdo original da lata 350ml.",
    price: 5.50,
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-bebidas"
  },
  {
    id: "p-suco-laranja",
    name: "Suco Natural de Laranja 400ml",
    slug: "suco-natural-de-laranja-400ml",
    description: "Suco natural de laranja espremido na hora, super refrescante.",
    ingredients: "Laranja pura e gelo (opcional).",
    price: 7.00,
    imageUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-bebidas"
  },

  // Adicionais
  {
    id: "p-torradas",
    name: "Torradas Caseiras (Porção)",
    slug: "torradas-caseiras-porcao",
    description: "Porção de torradas crocantes feitas na hora com manteiga e orégano.",
    ingredients: "Pão francês fatiado, manteiga de qualidade e orégano.",
    price: 4.00,
    imageUrl: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-adicionais"
  },
  {
    id: "p-queijo-ralado",
    name: "Queijo Coalho Ralado 50g",
    slug: "queijo-coalho-ralado-50g",
    description: "Porção extra de queijo coalho ralado maçaricado para salpicar na sua sopa.",
    ingredients: "Queijo coalho ralado legítimo.",
    price: 3.50,
    imageUrl: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=600&q=80",
    categoryId: "cat-adicionais"
  }
];

export const initialPromotions: Promotion[] = [
  {
    id: "prom-casal",
    name: "Combo Casal Aconchegante",
    description: "2 Sopas Médias (Sabores à escolha) + 1 Porção de Torradas Caseiras + 1 Coca-Cola 1L por um preço especial.",
    price: 42.00,
    imageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80",
    slug: "combo-casal-aconchegante",
    isAvailable: true
  },
  {
    id: "prom-familia",
    name: "Combo Super Família",
    description: "3 Sopas Grandes + 2 Porções de Torradas + 1 Guaraná Antarctica 2L para aquecer a janta de todo mundo.",
    price: 65.00,
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    slug: "combo-super-familia",
    isAvailable: true
  },
  {
    id: "prom-sopa-suco",
    name: "Sopa Individual + Coca Lata",
    description: "1 Sopa Média à sua escolha + 1 Coca-Cola Lata 350ml geladinha para o seu jantar rápido.",
    price: 21.00,
    imageUrl: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80",
    slug: "sopa-individual-mais-coca-lata",
    isAvailable: true
  },
  {
    id: "prom-janta-completa",
    name: "Janta Completa + Bebida",
    description: "1 Cuscuz Completo ou Macarronada + 1 Suco de Laranja 400ml para fechar a noite satisfeito.",
    price: 22.00,
    imageUrl: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80",
    slug: "janta-completa-mais-bebida",
    isAvailable: true
  }
];

export const initialDeliveryAreas: DeliveryArea[] = [
  { id: "area-piedade", name: "Piedade", deliveryFee: 5.00, deliveryTimeMinutes: 25, isActive: true },
  { id: "area-jardim-piedade", name: "Jardim Piedade", deliveryFee: 6.00, deliveryTimeMinutes: 30, isActive: true },
  { id: "area-cajueiro-seco", name: "Cajueiro Seco", deliveryFee: 7.00, deliveryTimeMinutes: 35, isActive: true },
  { id: "area-coquinho", name: "Coquinho", deliveryFee: 8.00, deliveryTimeMinutes: 40, isActive: true },
  { id: "area-prazeres", name: "Prazeres", deliveryFee: 6.50, deliveryTimeMinutes: 30, isActive: true },
  { id: "area-candeias", name: "Candeias", deliveryFee: 6.00, deliveryTimeMinutes: 30, isActive: true }
];

export const initialSettings: SystemSettings = {
  whatsappNumber: "5581999999999",
  workingHours: "Terça a Domingo, das 17h às 23h",
  isOpen: true,
  address: "Av. Bernardo Vieira de Melo, 3500 - Piedade, Jaboatão dos Guararapes - PE, 54410-010",
  instagramUrl: "https://instagram.com/sopariamaeefilha"
};
