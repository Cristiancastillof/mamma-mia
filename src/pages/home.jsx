import { useEffect, useState } from "react";
import CardPizza from "../components/cardpizza";
import { pizzas as pizzasData } from "../data/pizzas";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // carga directa desde data (sin fetch)
    setPizzas(pizzasData);
  }, []);

  return (
    <div className="container py-4">
      <div className="row">
        {pizzas.map((pizza) => (
          <div className="col-12 col-md-6 col-lg-4 mb-3" key={pizza.id}>
            <CardPizza pizza={pizza} />
          </div>
        ))}
      </div>
    </div>
  );
}
