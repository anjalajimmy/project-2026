import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sprout,
  ArrowLeft,
  ImagePlus,
  X,
  Package,
  IndianRupee,
  Leaf,
  CheckCircle2
} from "lucide-react";
import "./Addproduct.css";

function Addproduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    unit: "Kg",
    description: ""
  });

  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be below 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      setError("");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please upload a product image.");
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now(),
      image,
      createdAt: new Date().toISOString()
    };

    const existingProducts = JSON.parse(
      localStorage.getItem("greenzaProducts") || "[]"
    );

    localStorage.setItem(
      "greenzaProducts",
      JSON.stringify([...existingProducts, newProduct])
    );

    alert("Product published successfully!");
    navigate("/my-products");
  };

  return (
    <div className="add-product-page">

      <header className="ap-header">
        <div className="ap-brand">
          <div className="ap-logo"><Sprout size={25} /></div>
          <div>
            <h2>GREENZA</h2>
            <span>FARMER MARKETPLACE</span>
          </div>
        </div>

        <button
          className="ap-back"
          onClick={() => navigate("/farmer-dashboard")}
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>
      </header>

      <main className="ap-container">

        <div className="ap-heading">
          <div>
            <p className="ap-breadcrumb">Dashboard / Products / Add Product</p>
            <h1>Add New Product</h1>
            <p className="ap-subtitle">
              Showcase your fresh produce and reach more customers.
            </p>
          </div>
          <div className="ap-heading-icon">
            <Leaf size={32} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="ap-layout">

            <div className="ap-left">

              <section className="ap-card">
                <div className="ap-card-heading">
                  <div className="ap-card-icon"><Package size={20} /></div>
                  <div>
                    <h3>Product Information</h3>
                    <p>Enter the basic details of your product.</p>
                  </div>
                </div>

                <div className="ap-field">
                  <label>Product Name <span>*</span></label>
                  <input
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="e.g. Fresh Organic Tomatoes"
                    required
                  />
                </div>

                <div className="ap-field">
                  <label>Category <span>*</span></label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select product category</option>
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Grains & Cereals</option>
                    <option>Spices</option>
                    <option>Seeds</option>
                    <option>Dairy Products</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="ap-field">
                  <label>Product Description</label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Describe your product, freshness, quality and farming method..."
                    rows="5"
                  />
                </div>
              </section>

              <section className="ap-card">
                <div className="ap-card-heading">
                  <div className="ap-card-icon"><IndianRupee size={20} /></div>
                  <div>
                    <h3>Pricing & Availability</h3>
                    <p>Set your selling price and available stock.</p>
                  </div>
                </div>

                <div className="ap-two-fields">
                  <div className="ap-field">
                    <label>Price per unit (₹) <span>*</span></label>
                    <input
                      type="number"
                      name="price"
                      min="0.01"
                      step="0.01"
                      value={product.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      required
                    />
                  </div>

                  <div className="ap-field">
                    <label>Available Quantity <span>*</span></label>
                    <input
                      type="number"
                      name="quantity"
                      min="0.01"
                      step="0.01"
                      value={product.quantity}
                      onChange={handleChange}
                      placeholder="Enter quantity"
                      required
                    />
                  </div>
                </div>

                <div className="ap-field">
                  <label>Measurement Unit <span>*</span></label>
                  <select
                    name="unit"
                    value={product.unit}
                    onChange={handleChange}
                  >
                    <option>Kg</option>
                    <option>Gram</option>
                    <option>Piece</option>
                    <option>Dozen</option>
                    <option>Bag</option>
                    <option>Litre</option>
                  </select>
                </div>
              </section>

            </div>

            <div className="ap-right">

              <section className="ap-card ap-image-card">
                <div className="ap-card-heading">
                  <div className="ap-card-icon"><ImagePlus size={20} /></div>
                  <div>
                    <h3>Product Image</h3>
                    <p>Upload a clear photo of your produce.</p>
                  </div>
                </div>

                <label className="ap-upload-area">
                  {image ? (
                    <img src={image} alt="Product preview" />
                  ) : (
                    <>
                      <div className="ap-upload-icon">
                        <ImagePlus size={32} />
                      </div>
                      <h4>Upload product image</h4>
                      <p>Click to browse or select an image</p>
                      <span>PNG, JPG or JPEG · Maximum 2 MB</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    hidden
                  />
                </label>

                {image && (
                  <button
                    type="button"
                    className="ap-remove-image"
                    onClick={() => setImage("")}
                  >
                    <X size={15} /> Remove image
                  </button>
                )}
              </section>

              <section className="ap-preview-card">
                <div className="ap-preview-heading">
                  <h3>Product Preview</h3>
                  <span>LIVE PREVIEW</span>
                </div>

                <div className="ap-preview-image">
                  {image ? (
                    <img src={image} alt="Preview" />
                  ) : (
                    <div className="ap-preview-placeholder">
                      <ImagePlus size={30} />
                      <span>Product image</span>
                    </div>
                  )}
                </div>

                <div className="ap-preview-details">
                  <span className="ap-preview-category">
                    {product.category || "Product category"}
                  </span>
                  <h3>{product.name || "Your product name"}</h3>
                  <p>
                    ₹{product.price || "0"} / {product.unit}
                  </p>
                  <small>
                    {product.quantity || "0"} {product.unit} available
                  </small>
                </div>
              </section>

              <div className="ap-tip">
                <CheckCircle2 size={20} />
                <div>
                  <strong>Seller tip</strong>
                  <p>
                    Use bright, clear photos and accurate product details
                    to build customer trust.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {error && <p className="ap-error">{error}</p>}

          <div className="ap-actions">
            <button
              type="button"
              className="ap-cancel"
              onClick={() => navigate("/farmer-dashboard")}
            >
              Cancel
            </button>

            <button type="submit" className="ap-publish">
              <CheckCircle2 size={18} />
              Publish Product
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}

export default Addproduct;