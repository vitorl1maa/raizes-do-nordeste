import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export interface AddressData {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: AddressData) => void;
  initialAddress?: AddressData | null;
}

export const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onSave, initialAddress }) => {
  const [address, setAddress] = useState<AddressData>(
    initialAddress || {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    }
  );
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const isOtherFieldsDisabled = address.cep.length < 8 || isLoadingCep;

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let cepValue = e.target.value.replace(/\D/g, '');
    setAddress({ ...address, cep: cepValue });

    if (cepValue.length === 8) {
      setIsLoadingCep(true);
      setError('');
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        const data = await response.json();
        if (data.erro) {
          setError('CEP não encontrado.');
        } else {
          setAddress(prev => ({
            ...prev,
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.uf || ''
          }));
        }
      } catch (err) {
        setError('Erro ao buscar CEP.');
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  const handleSave = () => {
    if (!address.cep || !address.street || !address.number || !address.neighborhood || !address.city || !address.state) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    onSave(address);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-text-primary m-0">Endereço de Entrega</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-text-secondary">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          {error && <div className="text-sm text-error bg-red-50 p-3 rounded-xl">{error}</div>}
          
          <Input 
            label="CEP" 
            placeholder="Apenas números" 
            value={address.cep} 
            onChange={handleCepChange} 
            maxLength={8}
            disabled={isLoadingCep}
            icon={isLoadingCep ? <Loader2 size={20} className="animate-spin" /> : undefined}
          />
          
          <Input 
            label="Rua / Logradouro" 
            placeholder="Ex: Rua das Flores" 
            value={address.street} 
            onChange={e => setAddress({ ...address, street: e.target.value })} 
            disabled={isOtherFieldsDisabled}
          />
          
          <div className="flex gap-4">
            <Input 
              label="Número" 
              placeholder="Ex: 123" 
              value={address.number} 
              onChange={e => setAddress({ ...address, number: e.target.value })} 
              className="flex-1"
              disabled={isOtherFieldsDisabled}
            />
            <Input 
              label="Complemento" 
              placeholder="Ex: Apto 45" 
              value={address.complement} 
              onChange={e => setAddress({ ...address, complement: e.target.value })} 
              className="flex-1"
              disabled={isOtherFieldsDisabled}
            />
          </div>
          
          <Input 
            label="Bairro" 
            placeholder="Ex: Centro" 
            value={address.neighborhood} 
            onChange={e => setAddress({ ...address, neighborhood: e.target.value })} 
            disabled={isOtherFieldsDisabled}
          />
          
          <div className="flex gap-4">
            <Input 
              label="Cidade" 
              placeholder="Ex: Caruaru" 
              value={address.city} 
              onChange={e => setAddress({ ...address, city: e.target.value })} 
              className="flex-[2]"
              disabled={isOtherFieldsDisabled}
            />
            <Input 
              label="UF" 
              placeholder="Ex: PE" 
              value={address.state} 
              onChange={e => setAddress({ ...address, state: e.target.value })} 
              maxLength={2}
              className="flex-1"
              disabled={isOtherFieldsDisabled}
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-bg-base">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Endereço</Button>
        </div>
      </div>
    </div>
  );
};
