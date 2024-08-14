import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { ProdutsType } from "../utils/types";

interface ContextType {
    produts: ProdutsType[];
    loading: boolean;
    addProdut: (newProdut: ProdutsType) => Promise<void>;
    updateProdut: (id: string, updatedProdut: Partial<ProdutsType>) => Promise<void>;
    deleteProdut: (id: string) => Promise<void>;
}

const ProdutsContext = createContext<ContextType>({ 
    produts: [], 
    loading: true,
    addProdut: async () => {},
    updateProdut: async () => {},
    deleteProdut: async () => {}
 });

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [produts, setProduts] = useState<ProdutsType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const userCollectionRef = collection(db, 'users');
    
    const addProdut = async (newProdut: ProdutsType) => {
        try {
            await addDoc(userCollectionRef, newProdut);
        } catch (error) {
            console.log('Erro ao adicionar produto', error);
        }
    }

    // Atualiza produto ao Firestore
    const updateProdut = async (id: string, updateProdut: Partial<ProdutsType>) => {
        try {
            const produtDoc = doc(userCollectionRef, id);
            await updateDoc(produtDoc, updateProdut);
        } catch (error) {
            console.log('Erro em atualizar', error);
        }
    }

    const deleteProdut = async (id: string) => {
        try {
            const produtDoc = doc(userCollectionRef, id);
            await deleteDoc(produtDoc);
        } catch (error) {
            console.log('Erro em apagar', error);
        }
    }

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
        <ProdutsContext.Provider value={{ produts, addProdut, deleteProdut, updateProdut, loading }}>
            {children}
        </ProdutsContext.Provider>
    );
};

export const useProdutsContext = () => useContext(ProdutsContext);
