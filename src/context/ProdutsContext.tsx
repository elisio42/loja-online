import { createContext, useContext, useState, useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";

interface ProdutsType {
  id: string;
  name: string;
  price: number;
}

interface ContextType {
  produts: ProdutsType[];
  loading: boolean;
  error: boolean;
  addProdut: (produt: ProdutsType) => void;
  deleteProdut: (id: string) => void;
  updateProdut: (id: string, product: ProdutsType) => void
}

const ProdutsContext = createContext<ContextType>({
  produts: [],
  loading: true,
  error: false,
  addProdut: () => {},
  deleteProdut: () => {},
  updateProdut: () => {}
});

const ProdutsProvider = ({ children }: { children: React.ReactNode }) => {
  const [produts, setProduts] = useState<ProdutsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const produtsCollectionRef = collection(db, 'produts');
    const unsubscribe = onSnapshot(
      produtsCollectionRef,
      (snapshot) => {
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
        }));
  
        setProduts(products);
        localStorage.setItem('produts', JSON.stringify(products));
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao buscar produtos do Firebase:", error);
        setError(true);
        setLoading(false);
      }
    );

    return unsubscribe;  
  }, []);

  const addProdut = async (produt: ProdutsType) => {
    try {
      const docRef = await addDoc(collection(db, 'produts'), {
        name: produt.name,
        price: produt.price,
      });

      const newProdut: ProdutsType = {
        id: docRef.id,
        name: produt.name,
        price: produt.price,
      };

      setProduts(prevProduts => [...prevProduts, newProdut]);
      localStorage.setItem('produts', JSON.stringify([...produts, newProdut]));
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };
  
  const deleteProdut = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'produts', id));
      setProduts(produts.filter((produt) => produt.id !== id));
      localStorage.setItem('produts', JSON.stringify(produts.filter((produt) => produt.id !== id)));
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    }
  };
  
  const updateProdut = () => {}

  return (
    <ProdutsContext.Provider value={{ produts, addProdut, updateProdut, deleteProdut, loading, error }}>
      { children }
    </ProdutsContext.Provider>
  );
};

const useProdutsContext = () => useContext(ProdutsContext);

export { ProdutsProvider, useProdutsContext };