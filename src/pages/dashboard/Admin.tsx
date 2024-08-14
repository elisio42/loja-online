import { useProdutsContext } from "../../context/ProdutsContext"; 

const Admin = () => {
    const { produts, loading, deleteProdut } = useProdutsContext();
    if (loading) return <p>Loading ...</p>
    if (produts.length === 0) return <p>Add produts now!</p>
    
    return (
        <div className="text-3xl font-bold">
            Adimin page
            { produts.map(({ name, id, age }) => (
                <div key={id}>
                    <h2>Nome: { name}</h2>
                    <p>Idade: {age}</p>
                    <button onClick={() => deleteProdut(id)}>Delete product</button>
                </div>
            ))}
        </div>
    );
}

export default Admin