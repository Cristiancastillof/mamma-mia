import { createContext, useMemo, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  // Estructura de cada item en el carrito:
  // { id, name, price, img, count }
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === pizza.id);

      // Si ya existe, aumenta cantidad
      if (existing) {
        return prev.map((item) =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        );
      }

      // Si no existe, lo agrega con count=1
      return [
        ...prev,
        {
          id: pizza.id,
          name: pizza.name,
          price: pizza.price,
          img: pizza.img,
          count: 1,
        },
      ];
    });
  };

  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item))
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, count: item.count - 1 } : item))
        .filter((item) => item.count > 0) // si llega a 0, se elimina
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.count, 0);
  }, [cart]);

  const value = {
    cart,
    addToCart,
    increase,
    decrease,
    removeFromCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
