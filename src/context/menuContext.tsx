"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Category, Product, DeliveryArea, Promotion, SystemSettings } from "@/types";
import {
  initialCategories,
  initialProducts,
  initialPromotions,
  initialDeliveryAreas,
  initialSettings
} from "@/data/initialData";

interface MenuContextProps {
  categories: Category[];
  products: Product[];
  promotions: Promotion[];
  deliveryAreas: DeliveryArea[];
  settings: SystemSettings;
  isLoading: boolean;
  
  // Product Operations
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  // Category Operations
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  
  // Promotion Operations
  addPromotion: (promotion: Omit<Promotion, "id">) => void;
  updatePromotion: (promotion: Promotion) => void;
  deletePromotion: (id: string) => void;
  
  // Delivery Area Operations
  addDeliveryArea: (area: Omit<DeliveryArea, "id">) => void;
  updateDeliveryArea: (area: DeliveryArea) => void;
  deleteDeliveryArea: (id: string) => void;
  
  // Settings Operations
  updateSettings: (settings: SystemSettings) => void;
  
  // System Reset
  resetToDefault: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [deliveryAreas, setDeliveryAreas] = useState<DeliveryArea[]>(initialDeliveryAreas);
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCategories = localStorage.getItem("soparia_categories");
      const storedProducts = localStorage.getItem("soparia_products");
      const storedPromotions = localStorage.getItem("soparia_promotions");
      const storedAreas = localStorage.getItem("soparia_deliveryAreas");
      const storedSettings = localStorage.getItem("soparia_settings");

      if (storedCategories) setCategories(JSON.parse(storedCategories));
      else localStorage.setItem("soparia_categories", JSON.stringify(initialCategories));

      if (storedProducts) setProducts(JSON.parse(storedProducts));
      else localStorage.setItem("soparia_products", JSON.stringify(initialProducts));

      if (storedPromotions) setPromotions(JSON.parse(storedPromotions));
      else localStorage.setItem("soparia_promotions", JSON.stringify(initialPromotions));

      if (storedAreas) setDeliveryAreas(JSON.parse(storedAreas));
      else localStorage.setItem("soparia_deliveryAreas", JSON.stringify(initialDeliveryAreas));

      if (storedSettings) setSettings(JSON.parse(storedSettings));
      else localStorage.setItem("soparia_settings", JSON.stringify(initialSettings));
    } catch (error) {
      console.error("Failed to load local storage data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync helpers
  const saveAndSetCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    localStorage.setItem("soparia_categories", JSON.stringify(newCategories));
  };

  const saveAndSetProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("soparia_products", JSON.stringify(newProducts));
  };

  const saveAndSetPromotions = (newPromotions: Promotion[]) => {
    setPromotions(newPromotions);
    localStorage.setItem("soparia_promotions", JSON.stringify(newPromotions));
  };

  const saveAndSetAreas = (newAreas: DeliveryArea[]) => {
    setDeliveryAreas(newAreas);
    localStorage.setItem("soparia_deliveryAreas", JSON.stringify(newAreas));
  };

  const saveAndSetSettings = (newSettings: SystemSettings) => {
    setSettings(newSettings);
    localStorage.setItem("soparia_settings", JSON.stringify(newSettings));
  };

  // Product CRUD
  const addProduct = (p: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...p,
      id: `p-${Date.now()}`
    };
    saveAndSetProducts([...products, newProduct]);
  };

  const updateProduct = (p: Product) => {
    const updated = products.map((item) => (item.id === p.id ? p : item));
    saveAndSetProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((item) => item.id !== id);
    saveAndSetProducts(updated);
  };

  // Category CRUD
  const addCategory = (c: Omit<Category, "id">) => {
    const newCategory: Category = {
      ...c,
      id: `cat-${Date.now()}`
    };
    saveAndSetCategories([...categories, newCategory]);
  };

  const updateCategory = (c: Category) => {
    const updated = categories.map((item) => (item.id === c.id ? c : item));
    saveAndSetCategories(updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((item) => item.id !== id);
    saveAndSetCategories(updated);
    // Cascade delete products under this category
    const updatedProducts = products.filter((p) => p.categoryId !== id);
    saveAndSetProducts(updatedProducts);
  };

  // Promotion CRUD
  const addPromotion = (prom: Omit<Promotion, "id">) => {
    const newProm: Promotion = {
      ...prom,
      id: `prom-${Date.now()}`
    };
    saveAndSetPromotions([...promotions, newProm]);
  };

  const updatePromotion = (prom: Promotion) => {
    const updated = promotions.map((item) => (item.id === prom.id ? prom : item));
    saveAndSetPromotions(updated);
  };

  const deletePromotion = (id: string) => {
    const updated = promotions.filter((item) => item.id !== id);
    saveAndSetPromotions(updated);
  };

  // Delivery Area CRUD
  const addDeliveryArea = (area: Omit<DeliveryArea, "id">) => {
    const newArea: DeliveryArea = {
      ...area,
      id: `area-${Date.now()}`
    };
    saveAndSetAreas([...deliveryAreas, newArea]);
  };

  const updateDeliveryArea = (area: DeliveryArea) => {
    const updated = deliveryAreas.map((item) => (item.id === area.id ? area : item));
    saveAndSetAreas(updated);
  };

  const deleteDeliveryArea = (id: string) => {
    const updated = deliveryAreas.filter((item) => item.id !== id);
    saveAndSetAreas(updated);
  };

  // Settings
  const updateSettings = (newSettings: SystemSettings) => {
    saveAndSetSettings(newSettings);
  };

  // Reset
  const resetToDefault = () => {
    saveAndSetCategories(initialCategories);
    saveAndSetProducts(initialProducts);
    saveAndSetPromotions(initialPromotions);
    saveAndSetAreas(initialDeliveryAreas);
    saveAndSetSettings(initialSettings);
  };

  return (
    <MenuContext.Provider
      value={{
        categories,
        products,
        promotions,
        deliveryAreas,
        settings,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addPromotion,
        updatePromotion,
        deletePromotion,
        addDeliveryArea,
        updateDeliveryArea,
        deleteDeliveryArea,
        updateSettings,
        resetToDefault
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
