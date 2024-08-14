import { useProdutsContext } from "../context/ProdutsContext";

const Produts = () => {
    const { produts, loading } = useProdutsContext();
    if (loading) return <p>Loading ...</p>
    if (produts.length === 0) return <p>Users not found !</p>
    
    return (
        <div className="text-3xl font-bold">
            { produts.map(({ name, id, age }) => (
                <div key={id}>
                    <h2>Nome: { name}</h2>
                    <p>Idade: {age}</p>
                </div>
            ))}
        </div>
    );
};

export default Produts;