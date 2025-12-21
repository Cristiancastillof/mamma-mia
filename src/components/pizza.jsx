import { useEffect, useState } from "react";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    const getPizza = async () => {
      const res = await fetch("http://localhost:5000/api/pizzas/p001");
      const data = await res.json();
      setPizza(data);
    };

    getPizza();
  }, []);

  if (!pizza) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <div className="card">
        <img src={pizza.img} className="card-img-top" alt={pizza.name} />

        <div className="card-body">
          <h3 className="text-capitalize">{pizza.name}</h3>
          <p>{pizza.desc}</p>

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
      </div>
    </div>
  );
};

export default Pizza;
