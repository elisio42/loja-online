import { useProdutsContext } from "../../context/ProdutsContext"; 

const Admin = () => {
    const { produts, loading } = useProdutsContext();
    if (loading) return <p>Loading ...</p>
    if (produts.length === 0) return <p>Add produts now!</p>
    
    return (
        <div className="text-3xl font-bold">
            Adimin page
            { produts.map(({ name, id, price }) => (
                <div key={id}>
                    <h2>Nome: { name}</h2>
                    <p>Idade: {price}</p>
                    <button>Delete product</button>
                </div>
            ))}

    
        </div>
    );
}

export default Admin