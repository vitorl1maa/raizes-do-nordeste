import React, { useState } from 'react';
import { ManagerLayout } from '../organisms/ManagerLayout';
import { useProductStore, type Product } from '../../store/productStore';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  Edit3, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  X, 
  Check, 
  Image as ImageIcon 
} from 'lucide-react';

export const ManagerMenuPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductActive } = useProductStore();
  
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedBranch, setSelectedBranch] = useState('Todas');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Tapiocas');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [badge, setBadge] = useState('');

  // Categories list
  const categories = ['Todas', 'Mais Pedidos', 'Pratos Principais', 'Entradas', 'Sobremesas', 'Combos', 'Bebidas'];
  const formCategories = ['Tapiocas', 'Cuscuz', 'Pratos Principais', 'Entradas', 'Sobremesas', 'Combos', 'Bebidas'];

  // Handle open modal for new product
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setTitle('');
    setDescription('');
    setCategory('Tapiocas');
    setPrice('');
    setImageUrl('');
    setIsActive(true);
    setBadge('');
    setIsModalOpen(true);
  };

  // Handle open modal for edit
  const handleOpenEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setTitle(prod.title);
    setDescription(prod.description);
    setCategory(prod.category);
    setPrice(prod.price.toString());
    setImageUrl(prod.imageUrl);
    setIsActive(prod.active ?? true);
    setBadge(prod.badge ?? '');
    setIsModalOpen(true);
  };

  // Handle submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      title,
      description,
      category,
      price: parseFloat(price) || 0,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      active: isActive,
      badge: badge || undefined
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    
    setIsModalOpen(false);
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    // Unidade filter is simulated for layout compliance
    const matchesBranch = true; 
    
    return matchesSearch && matchesCategory && matchesBranch;
  });

  return (
    <ManagerLayout title="Gestão de Cardápio">
      <div className="flex flex-col gap-6">
        
        {/* Controls / Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            {/* Search */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar produto..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#FFF7F0]/40 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold text-text-primary placeholder:text-text-secondary"
              />
            </div>

            {/* Category Select */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="appearance-none pr-10 pl-4 py-3 rounded-2xl bg-white border border-gray-100 text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>Categoria: {cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4 pointer-events-none" />
            </div>

            {/* Branch Select */}
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={e => setSelectedBranch(e.target.value)}
                className="appearance-none pr-10 pl-4 py-3 rounded-2xl bg-white border border-gray-100 text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="Todas">Unidade: Todas</option>
                <option value="Boa Viagem">Boa Viagem</option>
                <option value="Pina">Pina</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Add Product Button */}
          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold px-6 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer text-sm shrink-0"
          >
            <Plus size={18} />
            <span>Adicionar Produto</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map(prod => (
            <div 
              key={prod.id} 
              className={`bg-white rounded-[24px] border shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                prod.active === false ? 'opacity-60 border-gray-150' : 'border-gray-100'
              }`}
            >
              {/* Product Header Info */}
              <div>
                <div className="h-44 w-full relative overflow-hidden bg-gray-55">
                  {prod.imageUrl ? (
                    <img 
                      src={prod.imageUrl} 
                      alt={prod.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon size={48} />
                    </div>
                  )}
                  {prod.badge && (
                    <span className="absolute top-4 left-4 bg-amber-400 text-text-primary font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                      {prod.badge}
                    </span>
                  )}
                  <span className="absolute top-4 right-4 bg-black/60 text-white font-semibold text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    {prod.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col gap-2">
                  <h3 className="font-bold text-lg text-text-primary">{prod.title}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{prod.description}</p>
                </div>
              </div>

              {/* Product Footer Actions */}
              <div className="px-6 pb-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-text-secondary font-medium">Preço</span>
                  <p className="font-extrabold text-xl text-primary mt-0.5">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prod.price)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Toggle */}
                  <button 
                    onClick={() => toggleProductActive(prod.id)}
                    className="p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    title={prod.active ? 'Desativar item' : 'Ativar item'}
                  >
                    {prod.active !== false ? (
                      <ToggleRight className="text-primary w-8 h-8" />
                    ) : (
                      <ToggleLeft className="text-gray-300 w-8 h-8" />
                    )}
                  </button>

                  {/* Edit */}
                  <button 
                    onClick={() => handleOpenEditModal(prod)}
                    className="p-2 bg-orange-50 hover:bg-orange-100 text-primary rounded-xl transition-colors cursor-pointer"
                    title="Editar produto"
                  >
                    <Edit3 size={18} />
                  </button>

                  {/* Delete */}
                  <button 
                    onClick={() => deleteProduct(prod.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-error rounded-xl transition-colors cursor-pointer"
                    title="Excluir produto"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full bg-white rounded-[24px] border border-gray-100 p-12 text-center flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 bg-[#FFF7F0] rounded-full flex items-center justify-center text-primary">
                <Search size={32} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-text-primary">Nenhum produto encontrado</h3>
                <p className="text-sm text-text-secondary mt-1">Tente ajustar sua busca ou filtros para ver os itens.</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl border border-gray-150 animate-in fade-in zoom-in-95 duration-200"
            onSubmit={handleSubmit}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-extrabold text-xl text-text-primary">
                {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-150 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <Input
                label="Nome do Produto"
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Tapioca Sertaneja"
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-sm font-bold text-text-primary">Categoria</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full appearance-none pr-10 pl-4 py-3 rounded-2xl bg-white border border-gray-100 text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                      {formCategories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                <Input
                  label="Preço (R$)"
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="Ex: 24.90"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-sm font-bold text-text-primary">Descrição</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Descreva os ingredientes e diferenciais do prato..."
                  className="w-full p-4 rounded-2xl bg-white border border-gray-100 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="URL da Imagem (opcional)"
                  type="text"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="Link da foto do produto"
                />
                
                <Input
                  label="Selo promocional (opcional)"
                  type="text"
                  value={badge}
                  onChange={e => setBadge(e.target.value)}
                  placeholder="Ex: 10% OFF, Novidade"
                />
              </div>

              {/* Status Toggle in Form */}
              <div className="flex justify-between items-center bg-[#FFF7F0]/40 p-4 rounded-2xl border border-orange-50 mt-2">
                <div>
                  <span className="font-bold text-sm text-text-primary">Disponibilidade</span>
                  <p className="text-xs text-text-secondary mt-0.5">Define se o produto está ativo no cardápio de vendas</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className="cursor-pointer"
                >
                  {isActive ? (
                    <ToggleRight className="text-primary w-10 h-10" />
                  ) : (
                    <ToggleLeft className="text-gray-300 w-10 h-10" />
                  )}
                </button>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex gap-4 mt-4 border-t border-gray-50 pt-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  fullWidth 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  fullWidth
                >
                  Salvar Produto
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ManagerLayout>
  );
};
