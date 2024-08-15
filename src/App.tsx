import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProdutsProvider } from "./context/ProdutsContext"
import Produts from "./components/Produts"
import Admin from "./pages/dashboard/Admin";
import AddProductForm from "./components/forms/AddProdutForm";
import { AuthProvider } from "./context/UserContext";

const App = () => {
  return (
    <ProdutsProvider>
      <AuthProvider>
      <Router>
          <Routes>
              <Route path="/" element={ <Produts /> }/>
              <Route path="/dashboard" element={<Admin />}/> 
              <Route path="/add" element={<AddProductForm />} />
          </Routes>
      </Router>
      </AuthProvider>
    </ProdutsProvider>
  )
}

export default App