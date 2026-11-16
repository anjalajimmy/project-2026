import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sprout,
  Plus,
  Package,
  Trash2,
  ArrowLeft,
  IndianRupee
} from "lucide-react";
import "./Myproduct.css";

function Myproduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(
      localStorage.getItem("greenzaProducts") || "[]"
    );
    setProducts(savedProducts);
  }, []);

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
    localStorage.setItem(
      "greenzaProducts",
      JSON.stringify(updatedProducts)
    );
  };

  return (
    <div className="my-products-page">
      <header className="mp-header">
        <div className="mp-brand">
          <Sprout size={25} />
          <h2>GREENZA</h2>
        </div>

        <button onClick={() => navigate("/farmer-dashboard")}>
          <ArrowLeft size={17} /> Dashboard
        </button>
      </header>

      <main className="mp-container">
        <div className="mp-heading">
          <div>
            <p>FARMER DASHBOARD / PRODUCTS</p>
            <h1>My Products</h1>
            <span>Manage your listed farm products.</span>
          </div>

          <button
            className="mp-add"
            onClick={() => navigate("/add-product")}
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

        <div className="mp-count">
          <Package size={20} />
          <span>Total Products: <strong>{products.length}</strong></span>
        </div>

        {products.length === 0 ? (
          <div className="mp-empty">
            <Package size={45} />
            <h2>No Products Yet</h2>
            <p>Start selling by adding your first farm product.</p>
            <button onClick={() => navigate("/add-product")}>
              <Plus size={17} /> Add Your First Product
            </button>
          </div>
        ) : (
          <div className="mp-grid">
            {products.map((product) => (
              <div className="mp-card" key={product.id}>
                <div className="mp-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <Package size={40} />
                  )}
                </div>

                <div className="mp-details">
                  <span className="mp-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <p className="mp-price">
                    <IndianRupee size={17} />
                    {product.price}
                    <small> / {product.unit}</small>
                  </p>

                  <p className="mp-quantity">
                    Available quantity: {product.quantity} {product.unit}
                  </p>

                  <button
                    className="mp-delete"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Myproduct;