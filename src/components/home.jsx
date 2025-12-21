import { useEffect, useState } from "react";
import CardPizza from "./CardPizza";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pizzas");
        const data = await res.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error cargando pizzas", error);
      }
    };

    getPizzas();
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
};

export default Home;
