import { useState } from "react";
import { pizzaCart } from "../assets/pizzas";

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart);

  const increase = (id) => {
    const newCart = cart.map((p) =>
      p.id === id ? { ...p, count: p.count + 1 } : p
    );
    setCart(newCart);
  };

  const decrease = (id) => {
    const newCart = cart
      .map((p) =>
        p.id === id ? { ...p, count: p.count - 1 } : p
      )
      .filter((p) => p.count > 0);

    setCart(newCart);
  };

  const total = cart.reduce(
    (acc, p) => acc + p.price * p.count,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Carrito de compras</h2>

      {cart.map((p) => (
        <div
          key={p.id}
          className="d-flex align-items-center mb-3"
        >
          <img
            src={p.img}
            alt={p.name}
            width={80}
            className="me-3"
          />

          <div className="flex-grow-1">
            <h5>{p.name}</h5>
            <p>${p.price}</p>
          </div>

          <button
            className="btn btn-outline-danger"
            onClick={() => decrease(p.id)}
          >
            -
          </button>

          <span className="mx-2">{p.count}</span>

          <button
            className="btn btn-outline-success"
            onClick={() => increase(p.id)}
          >
            +
          </button>
        </div>
      ))}

      <hr />

      <h3>Total: ${total}</h3>

      <button className="btn btn-primary mt-3">
        Pagar
      </button>
    </div>
  );
};

export default Cart;
