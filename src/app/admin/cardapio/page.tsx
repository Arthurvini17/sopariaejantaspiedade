"use client";

import React, { useState } from "react";
import { useMenu } from "@/context/menuContext";
import { Product, Category } from "@/types";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  PlusCircle,
  FileEdit,
  Sparkles,
  Search,
  CheckCircle
} from "lucide-react";

export default function AdminCardapio() {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    deleteCategory
  } = useMenu();

  const [activeTab, setActiveTab] = useState<"produtos" | "categorias">("produtos");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modals / Form States for Products
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    ingredients: "",
    price: "",
    imageUrl: "",
    categoryId: "",
    isPromotional: false
  });

  // Modals / Form States for Categories
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleOpenProductModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        description: product.description,
        ingredients: product.ingredients,
        price: product.price.toString(),
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
        isPromotional: !!product.isPromotional
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: "",
        description: "",
        ingredients: "",
        price: "",
        imageUrl: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80",
        categoryId: categories[0]?.id || "",
        isPromotional: false
      });
    }
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate slug from name
    const slug = productForm.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const productData = {
      name: productForm.name,
      description: productForm.description,
      ingredients: productForm.ingredients,
      price: parseFloat(productForm.price) || 0,
      imageUrl: productForm.imageUrl,
      categoryId: productForm.categoryId,
      isPromotional: productForm.isPromotional,
      slug
    };

    if (editingProduct) {
      updateProduct({
        ...productData,
        id: editingProduct.id
      });
    } else {
      addProduct(productData);
    }

    handleCloseProductModal();
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const slug = categoryName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    addCategory({
      name: categoryName,
      slug
    });

    setCategoryName("");
    setIsCategoryModalOpen(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-poppins text-white">Gerenciar Cardápio</h1>
          <p className="text-sm text-gray-400">Adicione, edite e remova pratos, bebidas ou categorias do site.</p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "produtos" ? (
            <button
              onClick={() => handleOpenProductModal(null)}
              className="bg-brand-orange text-brand-black hover:bg-brand-yellow font-bold px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-orange/15 transition-all cursor-pointer text-sm"
            >
              <Plus className="w-5 h-5" /> Adicionar Produto
            </button>
          ) : (
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="bg-brand-orange text-brand-black hover:bg-brand-yellow font-bold px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-orange/15 transition-all cursor-pointer text-sm"
            >
              <Plus className="w-5 h-5" /> Adicionar Categoria
            </button>
          )}
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-white/5 gap-6">
        <button
          onClick={() => setActiveTab("produtos")}
          className={`pb-4 text-sm font-semibold tracking-wide transition-all border-b-2 cursor-pointer ${
            activeTab === "produtos"
              ? "text-brand-orange border-brand-orange font-bold"
              : "text-gray-400 border-transparent hover:text-white"
          }`}
        >
          Produtos ({products.length})
        </button>
        
        <button
          onClick={() => setActiveTab("categorias")}
          className={`pb-4 text-sm font-semibold tracking-wide transition-all border-b-2 cursor-pointer ${
            activeTab === "categorias"
              ? "text-brand-orange border-brand-orange font-bold"
              : "text-gray-400 border-transparent hover:text-white"
          }`}
        >
          Categorias ({categories.length})
        </button>
      </div>

      {/* Products Content Tab */}
      {activeTab === "produtos" && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="relative max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
              <Search className="w-4.5 h-4.5" />
            </span>
            <input
              type="text"
              placeholder="Buscar produto por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-brand-dark/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-all placeholder:text-gray-500"
            />
          </div>

          {/* Grid of items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              const catName = categories.find((c) => c.id === p.categoryId)?.name || "N/A";
              return (
                <div
                  key={p.id}
                  className="glass p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex gap-4"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-brand-dark">
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-white font-bold text-base truncate font-poppins">{p.name}</h3>
                        {p.isPromotional && (
                          <span className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-extrabold text-[8px] uppercase px-2 py-0.5 rounded-full">
                            Promo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 font-medium">{catName}</p>
                      <p className="text-sm font-black text-brand-yellow font-poppins mt-1">
                        R$ {p.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => handleOpenProductModal(p)}
                        className="text-gray-400 hover:text-brand-orange hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          if (confirm(`Tem certeza que deseja excluir "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors cursor-pointer"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-brand-dark/20 border border-dashed border-white/5 rounded-2xl">
              <p className="text-gray-500 text-sm">Nenhum produto cadastrado ou encontrado.</p>
            </div>
          )}
        </div>
      )}

      {/* Categories Content Tab */}
      {activeTab === "categorias" && (
        <div className="max-w-xl space-y-6">
          <div className="glass rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-white font-bold text-base font-poppins">Categorias Ativas</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Excluir uma categoria apagará todos os produtos vinculados a ela.
              </p>
            </div>

            <div className="divide-y divide-white/5">
              {categories.map((cat) => {
                const prodsInCat = products.filter((p) => p.categoryId === cat.id).length;
                return (
                  <div key={cat.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm sm:text-base font-poppins">{cat.name}</p>
                      <p className="text-xs text-gray-500">{prodsInCat} produtos vinculados</p>
                    </div>

                    <button
                      onClick={() => {
                        if (
                          confirm(
                            `Tem certeza que deseja excluir a categoria "${cat.name}"? Isso excluirá todos os seus ${prodsInCat} produtos!`
                          )
                        ) {
                          deleteCategory(cat.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2.5 rounded-xl transition-all cursor-pointer"
                      title="Excluir Categoria"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-brand-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg font-poppins">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </h3>
              <button onClick={handleCloseProductModal} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scrollable */}
            <form onSubmit={handleProductSubmit} className="p-6 space-y-4 overflow-y-auto flex-grow">
              
              {/* Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                  Nome do Item
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="Ex: Sopa de Frango com Legumes"
                  className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                  Categoria
                </label>
                <select
                  value={productForm.categoryId}
                  onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                  className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price & Promo */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="Ex: 18.00"
                    className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-all"
                  />
                </div>

                <div className="flex items-center pt-6 px-2">
                  <label className="flex items-center space-x-2.5 text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={productForm.isPromotional}
                      onChange={(e) => setProductForm({ ...productForm, isPromotional: e.target.checked })}
                      className="accent-brand-orange w-4 h-4 rounded"
                    />
                    <span className="text-gray-300 font-semibold">Promocional</span>
                  </label>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  required
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  placeholder="URL pública da foto..."
                  className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                  Descrição Curta
                </label>
                <textarea
                  required
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Ex: Sopa super nutritiva cozida lentamente com legumes..."
                  className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-all resize-none"
                ></textarea>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                  Ingredientes (separados por vírgula)
                </label>
                <input
                  type="text"
                  value={productForm.ingredients}
                  onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                  placeholder="Ex: Frango desfiado, batata, cenoura, cheiro verde"
                  className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-brand-orange text-brand-black hover:bg-brand-yellow font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-orange/10 mt-2 cursor-pointer text-sm"
              >
                {editingProduct ? "Salvar Alterações" : "Criar Produto"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-brand-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg font-poppins">Adicionar Categoria</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 font-poppins">
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ex: Sobremesas"
                  className="w-full bg-brand-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-orange transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange text-brand-black hover:bg-brand-yellow font-extrabold py-3 rounded-xl transition-all shadow-lg shadow-brand-orange/10 cursor-pointer text-sm"
              >
                Criar Categoria
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
