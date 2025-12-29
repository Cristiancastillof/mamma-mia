import React from "react";
import { pizzas } from "../data/pizzas";

export default function Pizza() {
  const pizza = pizzas.find((p) => p.id === "p001");

  if (!pizza) return <div className="container py-4">Pizza no encontrada</div>;

  return (
    <div className="container py-4">
      <h1 className="text-capitalize">{pizza.name}</h1>
      <img src={pizza.img} alt={pizza.name} className="img-fluid my-3" />
      <h5>Ingredientes:</h5>
      <ul>
        {pizza.ingredients.map((ing) => (
          <li key={ing} className="text-capitalize">
            {ing}
          </li>
        ))}
      </ul>
      <h4>${pizza.price}</h4>
    </div>
  );
}
