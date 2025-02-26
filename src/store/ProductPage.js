import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate จาก react-router-dom
import "./css/ProductPage.css";

const ProductPage = () => {
  const [cart, setCart] = useState([]); // สถานะสำหรับเก็บสินค้าที่อยู่ในตะกร้า
  const navigate = useNavigate(); // สร้างตัวแปร navigate เพื่อใช้ในการนำทาง

  const handleCart = (e) => {
    e.preventDefault(); 
    navigate("/cartpage"); // นำทางไปยังหน้าตระกร้าสินค้า
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]); // เพิ่มสินค้าลงในตะกร้า
    console.log(`${product.name} added to cart!`);
  };

  const products = [
    { id: 1, name: "Y Collection Polo 2025_Black", price: "$10", image: "https://yuedpao.com/cdn/shop/files/17-12-245754.jpg?v=1739945356&width=1445" },
    { id: 2, name: "Y Collection Polo 2025_White", price: "$20", image: "https://yuedpao.com/cdn/shop/files/17-12-245388.jpg?v=1739956777&width=1445" },
    { id: 3, name: "FLEECE AIR FLOW", price: "$30", image: "https://yuedpao.com/cdn/shop/files/19-11-2411874.jpg?v=1733392242&width=1445" },
    { id: 4, name: "SLIM JEANS_BLACK", price: "$40", image: "https://yuedpao.com/cdn/shop/files/TAILOR_COOL_POLO_Black_-_YUEDPAO-5589339.png?v=1731780358" },
    { id: 5, name: "Shortpants_Cloud white (กางเกง)", price: "$30", image: "https://yuedpao.com/cdn/shop/files/19-11-240494.jpg?v=1733392566&width=1445" },
    { id: 6, name: "โครตนุ่ม_สี Black", price: "$40", image: "https://yuedpao.com/cdn/shop/files/KODNUMNC18-07-230571.jpg?v=1733236010&width=1445 "},
  ];

  return (
    <div className="product-page">
      <header className="header">
        <h1>G1 -Shop</h1>
        <form onSubmit={handleCart}>
          <button type="submit" className="add-button">ตระกร้าสินค้า</button>
        </form>
      </header>

      <main>
        <h2 className="title">PRODUCTS</h2>
        <div className="product-list">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img className="product-image" src={product.image} alt={product.name} />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <button
                  className="add-button"
                  onClick={() => handleAddToCart(product)} // เพิ่มสินค้าเมื่อคลิกปุ่ม
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">E-Commerce</footer>
    </div>
  );
};

export default ProductPage;
