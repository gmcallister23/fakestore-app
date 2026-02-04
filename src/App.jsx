import Home from "./components/Home"
import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductDetails from "./components/ProductDetails"
import ProductList from "./components/ProductList"
import AddProduct from "./components/AddProduct"
import EditProduct from "./components/EditProduct"
import EditProductForm from "./components/EditProductForm"


function App() {
  
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/edit/:id" element={<EditProductForm />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
