import {useNavigate} from "react-router-dom";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  ChartNoAxesCombined,
  User,
  Plus,
  Bell,
  Search,
  Sprout,
  LogOut,
  Menu
} from "lucide-react";

import "./Farmerdashboard.css";

function FarmerDashboard() {
    const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Overview");

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Add Product", icon: Plus },
    { name: "My Products", icon: Package },
    { name: "Orders Received", icon: ShoppingBag },
    { name: "Sales Analytics", icon: ChartNoAxesCombined },
    { name: "My Profile", icon: User }
  ];

  return (
    <div className="farmer-dashboard">

      {/* Sidebar */}
      <aside className="farmer-sidebar">

        <div className="farmer-logo">
          <Sprout size={32} />
          <h2>GREENZA</h2>
        </div>

        <p className="farmer-menu-title">MAIN MENU</p>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={
                  activePage === item.name
                    ? "farmer-menu-item active"
                    : "farmer-menu-item"
                }
                onClick={() => {
  if (item.name === "Add Product") {
  navigate("/add-product");
} else if (item.name === "My Products") {
  navigate("/my-products");
} else {
  setActivePage(item.name);
}
}}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        
    <button
  className="farmer-logout"
  onClick={() => navigate("/login")}
>
  <LogOut size={20} />
  Logout
</button>

      </aside>

      {/* Main Content */}
      <main className="farmer-main">

        <header className="farmer-header">
          <div>
            <h1>Farmer Dashboard</h1>
            <p>Welcome back! Manage your farm business here.</p>
          </div>

          <div className="farmer-header-right">
            <button className="farmer-notification">
              <Bell size={22} />
            </button>
            <div className="farmer-avatar">F</div>
          </div>
        </header>

        <section className="farmer-welcome">
          <div>
            <h2>Hello, Farmer! 🌱</h2>
            <p>Keep growing your business with GREENZA.</p>
          </div>
          <Sprout size={65} />
        </section>

        {/* Statistics */}
        <section className="farmer-stats">

          <div className="farmer-stat-card">
            <div className="stat-icon green">
              <Package size={25} />
            </div>
            <p>Total Products</p>
            <h2>
  {JSON.parse(localStorage.getItem("greenzaProducts") || "[]").length}
</h2>
            <span>Products listed</span>
          </div>

          <div className="farmer-stat-card">
            <div className="stat-icon orange">
              <ShoppingBag size={25} />
            </div>
            <p>Orders Received</p>
            <h2>18</h2>
            <span>Customer orders</span>
          </div>

          <div className="farmer-stat-card">
            <div className="stat-icon blue">
              <ChartNoAxesCombined size={25} />
            </div>
            <p>Total Revenue</p>
            <h2>₹12,500</h2>
            <span>Sample earnings</span>
          </div>

          <div className="farmer-stat-card">
            <div className="stat-icon purple">
              <User size={25} />
            </div>
            <p>Pending Orders</p>
            <h2>5</h2>
            <span>Need attention</span>
          </div>

        </section>

        {/* Recent Orders */}
        <section className="farmer-orders">

          <div className="farmer-section-heading">
            <h2>Recent Orders</h2>
            <button>View All</button>
          </div>

          <div className="farmer-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Buyer</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Fresh Tomatoes</td>
                  <td>Arun</td>
                  <td>10 kg</td>
                  <td>₹300</td>
                  <td><span className="order-status">Pending</span></td>
                </tr>

                <tr>
                  <td>Organic Rice</td>
                  <td>Meera</td>
                  <td>20 kg</td>
                  <td>₹1,000</td>
                  <td><span className="order-completed">Completed</span></td>
                </tr>

                <tr>
                  <td>Fresh Bananas</td>
                  <td>Rahul</td>
                  <td>5 kg</td>
                  <td>₹250</td>
                  <td><span className="order-status">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>

        </section>

      </main>
    </div>
  );
}

export default FarmerDashboard;