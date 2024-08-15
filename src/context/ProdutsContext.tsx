import { createContext, useContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
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
}

const ProdutsContext = createContext<ContextType>({
  produts: [],
  loading: true,
  error: false,
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
  return (
    <ProdutsContext.Provider value={{ produts, loading, error }}>
      { children }
    </ProdutsContext.Provider>
  );
};

const useProdutsContext = () => useContext(ProdutsContext);

export { ProdutsProvider, useProdutsContext };