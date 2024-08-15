import React, { useState } from 'react';
import { useProdutsContext } from '../../context/ProdutsContext';

interface AddProductFormProps {
  // Nenhuma propriedade é necessária
}

interface ProdutsType {
    id: string;
    name: string;
    price: number;
}

const AddProductForm: React.FC<AddProductFormProps> = () => {
  const { addProdut } = useProdutsContext();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !price) {
      setError('Preencha todos os campos');
      return;
    }
    try {
      const produt: ProdutsType = {
        id: '',
        name,
        price,
      };
      console.log('adicionando', name, price)
      await addProdut(produt);
      setName('');
      setPrice(0);
      setError('');
    } catch (error) {
      setError('Erro ao adicionar produto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome do produto:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Preço do produto:
        <input type="number" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Adicionar produto</button>
    </form>
  );
};

export default AddProductForm;