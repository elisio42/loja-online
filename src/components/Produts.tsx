import { useProdutsContext } from "../context/ProdutsContext";
import { useAuth } from "../context/UserContext";

const Produts = () => {
    const { produts, loading } = useProdutsContext();
    const { signInWithGoogle , user, signOut } = useAuth();
    if (loading) return <p>Loading ...</p>
    if (produts.length === 0) return <p>Users not found !</p>
    
    return (
        <div className="text-3xl font-bold">
            { produts.map(({ name, id, price }) => (
                <div key={id}>
                    <h2>Nome: { name}</h2>
                    <p>Price: {price}</p>
                </div>
            ))}
            { user && (
                <p> { user.displayName } <button onClick={() => signOut()}>Sair</button> </p>
            ) }


            <button onClick={() => signInWithGoogle()}>Get started</button>
        </div>
    );
};

export default Produts;