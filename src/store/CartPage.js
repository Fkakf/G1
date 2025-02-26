import React from "react";
import "./css/cart.css";

function CartPage() {
  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>G1 -Shop</h1>
        <div className="cart-icon">🛒</div>
      </header>
      <div className="cart-content">
        <div className="cart-item">
          <div className="item-pic">PIC</div>
          <div className="item-details">
            <label>ชื่อสินค้า:</label>
            <input type="text" placeholder="Product Name" />
          </div>
        </div>

        <div className="cart-item">
          <div className="item-pic">PIC</div>
          <div className="item-details">
            <label>ชื่อสินค้า:</label>
            <input type="text" placeholder="Product Name" />
          </div>
        </div>

        <div className="cart-item">
          <div className="item-pic">PIC</div>
          <div className="item-details">
            <label>ชื่อสินค้า:</label>
            <input type="text" placeholder="Product Name" />
          </div>
        </div>

        <div className="cart-item">
          <div className="item-pic">PIC</div>
          <div className="item-details">
            <label>ชื่อสินค้า:</label>
            <input type="text" placeholder="Product Name" />
          </div>
        </div>
      </div>

      <div className="cart-summary">
        <div className="total">
          <span>ยอดรวม:</span>
          <span>ข้อมูล 500</span>
        </div>
        <button className="proceed-button">ดำเนินการต่อ</button>
      </div>
    </div>
  );
}

export default CartPage;
