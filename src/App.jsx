
      import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Signup from './components/signup'
import Loginpage from './components/Loginpage'
import Home from './components/Home'
import Farmerdashboard from './components/Farmerdashboard'
import AddProduct from './components/AddProduct'
import Myproduct from './components/Myproduct'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/farmer-dashboard" element={<Farmerdashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/my-products" element={<Myproduct/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App