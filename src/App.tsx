import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/ProdutsContext"
import Produts from "./components/Produts"
import Admin from "./pages/dashboard/Admin";

const App = () => {
  return (
    <UserProvider>
      <Router>
          <Routes>
              <Route path="/" element={ <Produts /> }/>
              <Route path="/dashboard" element={<Admin />}/> 
          </Routes>
      </Router>
    </UserProvider>
  )
}

export default App