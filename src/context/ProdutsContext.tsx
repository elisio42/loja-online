import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";
import { ProdutsType } from "../utils/types";

interface ContextType {
    produts: ProdutsType[];
    loading: boolean;
}

const ProdutsContext = createContext<ContextType>({ produts: [], loading: true });

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [produts, setProduts] = useState<ProdutsType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const userCollectionRef = collection(db, 'users');

    useEffect(() => {
        const initializeData = () => {
            const localData = localStorage.getItem('produts');

            if (localData) {
                try {
                    const products = JSON.parse(localData) as ProdutsType[];
                    setProduts(products);
                } catch (error) {
                    console.error("Erro ao processar dados do localStorage:", error);
                }
            }

            // Busque os dados do Firebase e atualize o localStorage se necessário
            const unsubscribe = onSnapshot(userCollectionRef, 
                (snapshot) => {
                    try {
                        const products = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as ProdutsType));
                        setProduts(products);
                        localStorage.setItem('produts', JSON.stringify(products)); // Atualiza o localStorage com os dados mais recentes
                    } catch (error) {
                        console.error("Erro ao processar dados do Firebase:", error);
                    } finally {
                        setLoading(false); // Indica que o carregamento dos dados foi concluído
                    }
                }, 
                (error) => {
                    console.error("Erro ao buscar produtos do Firebase:", error);
                    setLoading(false); // Indica que houve um erro ao buscar os dados
                }
            );

            // Cleanup on component unmount
            return () => unsubscribe();
        };

        initializeData();
    }, []);

    return (
        <ProdutsContext.Provider value={{ produts, loading }}>
            {children}
        </ProdutsContext.Provider>
    );
};

export const useProdutsContext = () => useContext(ProdutsContext);
