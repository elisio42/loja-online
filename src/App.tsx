import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProdutsProvider } from "./context/ProdutsContext"
import Produts from "./components/Produts"
import Admin from "./pages/dashboard/Admin";

const App = () => {
  return (
    <ProdutsProvider>
      <Router>
          <Routes>
              <Route path="/" element={ <Produts /> }/>
              <Route path="/dashboard" element={<Admin />}/> 
          </Routes>
      </Router>
    </ProdutsProvider>
  )
}

export default App