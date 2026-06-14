export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  ingredients: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  isPromotional?: boolean;
}

export interface DeliveryArea {
  id: string;
  name: string;
  deliveryFee: number;
  deliveryTimeMinutes: number;
  isActive: boolean;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  slug: string;
  isAvailable: boolean;
}

export interface SystemSettings {
  whatsappNumber: string;
  workingHours: string;
  isOpen: boolean;
  address: string;
  instagramUrl?: string;
}
