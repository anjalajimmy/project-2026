
import React,{useState}from"react";
import {Link} from "react-router-dom";
import "./Home.css";

import {
  Sprout,
  Search,
  ShoppingCart,
  User,
  Menu,
  ArrowRight,
  Tractor,
  Leaf,
  Package,
  MapPin,
  Plus
} from "lucide-react";

import "./Home.css";

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 30,
    unit: "kg",
    quantity: "100 kg available",
    farmer: "Ramesh Kumar",
    location: "Thrissur",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600"
  },
  {
    id: 2,
    name: "Fresh Bananas",
    category: "Fruits",
    price: 45,
    unit: "kg",
    quantity: "80 kg available",
    farmer: "Suresh",
    location: "Chalakudy",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600"
  },
  {
    id: 3,
    name: "Organic Rice",
    category: "Grains",
    price: 65,
    unit: "kg",
    quantity: "200 kg available",
    farmer: "Joseph",
    location: "Palakkad",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600"
  },
  {
    id: 4,
    name: "Fresh Carrots",
    category: "Vegetables",
    price: 40,
    unit: "kg",
    quantity: "50 kg available",
    farmer: "Anil Kumar",
    location: "Idukki",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600"
  },
  {
    id: 5,
    name: "Fresh Mangoes",
    category: "Fruits",
    price: 80,
    unit: "kg",
    quantity: "60 kg available",
    farmer: "Manoj",
    location: "Kozhikode",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600"
  },
  {
    id: 6,
    name: "Green Chilli",
    category: "Vegetables",
    price: 55,
    unit: "kg",
    quantity: "40 kg available",
    farmer: "Biju",
    location: "Ernakulam",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600"
  },
  {
    id: 7,
    name: "Paddy Seeds",
    category: "Seeds",
    price: 120,
    unit: "packet",
    quantity: "30 packets available",
    farmer: "Krishna",
    location: "Palakkad",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600"
  },
  {
    id: 8,
    name: "Farming Tools",
    category: "Equipment",
    price: 350,
    unit: "piece",
    quantity: "15 pieces available",
    farmer: "Rajesh",
    location: "Thrissur",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
  }
];

const categories = [
  { name: "All", icon: "🌱" },
  { name: "Vegetables", icon: "🥕" },
  { name: "Fruits", icon: "🍎" },
  { name: "Grains", icon: "🌾" },
  { name: "Seeds", icon: "🌱" },
  { name: "Equipment", icon: "🚜" }
];

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart((previous) => [...previous, product]);
  };

  return (
    <div className="greenza-home">

      {/* NAVBAR */}

      <nav className="g-navbar">

        <div className="g-logo">
          <Sprout size={34} />
          <span>GREENZA</span>
        </div>

        <button
          className="g-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>

        <div className={`g-nav-links ${menuOpen ? "g-show-menu" : ""}`}>
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#marketplace">Marketplace</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="g-nav-actions">

          <button className="g-cart-btn">
            <ShoppingCart size={22} />
            <span>{cart.length}</span>
          </button>

          <button className="g-profile-btn">
            <User size={21} />
            Profile
          </button>

        </div>

      </nav>

      {/* HERO SECTION */}

      <section className="g-hero" id="home">

        <div className="g-hero-content">

          <span className="g-hero-tag">
            <Leaf size={17} /> FARMERS MARKETPLACE
          </span>

          <h1>
            Growing Together,
            <span> Trading Better.</span>
          </h1>

          <p>
            A marketplace made for farmers. Buy quality agricultural
            products and sell your harvest directly to customers.
            Connect, trade and grow with GREENZA.
          </p>

          <div className="g-hero-buttons">
            <a href="#marketplace" className="g-buy-btn">
              Buy Products <ArrowRight size={19} />
            </a>

           <Link to="/farmer-dashboard" className="g-sell-btn">
  <Plus size={19} /> Sell Products
</Link>
          </div>

          <div className="g-hero-stats">
            <div>
              <h3>500+</h3>
              <span>Farmers</span>
            </div>

            <div>
              <h3>1,000+</h3>
              <span>Products</span>
            </div>

            <div>
              <h3>100%</h3>
              <span>Farm Focused</span>
            </div>
          </div>

        </div>

        <div className="g-hero-image">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000"
            alt="Green agricultural farmland"
          />
        </div>

      </section>

      {/* FEATURES */}

      <section className="g-features">

        <div>
          <Sprout />
          <section>
            <h3>Direct From Farmers</h3>
            <p>Connect with producers</p>
          </section>
        </div>

        <div>
          <Package />
          <section>
            <h3>Quality Products</h3>
            <p>Fresh agricultural goods</p>
          </section>
        </div>

        <div>
          <Tractor />
          <section>
            <h3>Farmer Friendly</h3>
            <p>Made for agriculture</p>
          </section>
        </div>

        <div>
          <ShoppingCart />
          <section>
            <h3>Easy Shopping</h3>
            <p>Simple online buying</p>
          </section>
        </div>

      </section>

      {/* CATEGORIES */}

      <section className="g-categories" id="categories">

        <div className="g-heading">
          <span>EXPLORE GREENZA</span>
          <h2>Browse Categories</h2>
          <p>Find everything you need for farming.</p>
        </div>

        <div className="g-category-grid">

          {categories.map((item) => (
            <button
              key={item.name}
              className={`g-category-card ${
                category === item.name ? "g-category-active" : ""
              }`}
              onClick={() => {
                setCategory(item.name);
                document.getElementById("marketplace")?.scrollIntoView({
                  behavior: "smooth"
                });
              }}
            >
              <span>{item.icon}</span>
              <h3>{item.name}</h3>
              <ArrowRight size={18} />
            </button>
          ))}

        </div>

      </section>

      {/* MARKETPLACE */}

      <section className="g-marketplace" id="marketplace">

        <div className="g-heading">
          <span>GREENZA MARKETPLACE</span>
          <h2>Available Products</h2>
          <p>Discover products offered by farmers.</p>
        </div>

        <div className="g-market-tools">

          <div className="g-search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search vegetables, fruits, grains..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link to="/farmer-dashboard" className="g-list-product">
  <Plus size={18} /> List Your Product
</Link>

        </div>

        <div className="g-filter-list">
          {categories.map((item) => (
            <button
              key={item.name}
              className={category === item.name ? "g-filter-active" : ""}
              onClick={() => setCategory(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="g-product-grid">

          {filteredProducts.map((product) => (

            <div className="g-product-card" key={product.id}>

              <div className="g-product-image">
                <img src={product.image} alt={product.name} />
                <span>Available</span>
              </div>

              <div className="g-product-info">

                <p className="g-product-category">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <h2>
                  ₹{product.price}
                  <small> / {product.unit}</small>
                </h2>

                <p className="g-quantity">
                  {product.quantity}
                </p>

                <div className="g-farmer-info">
                  <User size={16} />
                  <span>{product.farmer}</span>
                </div>

                <div className="g-location">
                  <MapPin size={15} />
                  <span>{product.location}</span>
                </div>

                <button
                  className="g-add-cart"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart size={17} />
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

        {filteredProducts.length === 0 && (
          <p className="g-no-products">
            No products found. Try another search.
          </p>
        )}

      </section>

      {/* SELL BANNER */}

      <section className="g-sell-banner">

        <div>
          <span>FOR FARMERS</span>
          <h2>Have Products to Sell?</h2>
          <p>
            Bring your agricultural products to GREENZA.
            Reach more buyers and grow your farming business.
          </p>

          <Link to="/farmer-dashboard">
             Start Selling <ArrowRight size={19} />
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1592982537447-6f2a6a0a7d9d?w=800"
          alt="Farmer working in agricultural field"
        />

      </section>

      {/* ABOUT */}

      <section className="g-about" id="about">

        <div className="g-about-image">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800"
            alt="Agricultural farmland"
          />
        </div>

        <div>
          <span>ABOUT GREENZA</span>
          <h2>Empowering Farmers Through Digital Markets.</h2>
          <p>
            GREENZA aims to connect farmers and buyers through
            one digital marketplace. We make agricultural trading
            easier by bringing products, sellers and buyers together.
          </p>
          <a href="#marketplace">
            Explore Marketplace <ArrowRight size={18} />
          </a>
        </div>

      </section>

      {/* FOOTER */}

      <footer className="g-footer" id="contact">

        <div className="g-footer-brand">
          <Sprout size={35} />
          <h2>GREENZA</h2>
          <p>Growing Together. Trading Better.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#marketplace">Marketplace</a>
          <a href="#about">About Us</a>
        </div>

        <div>
          <h3>Marketplace</h3>
          <a href="#categories">Vegetables</a>
          <a href="#categories">Fruits</a>
          <a href="#categories">Grains</a>
          <a href="#categories">Seeds</a>
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: support@greenza.com</p>
          <p>India</p>
        </div>

        <div className="g-copyright">
          © 2026 GREENZA. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}

export default Home;