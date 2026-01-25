import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPizza = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        if (!res.ok) throw new Error("No se pudo obtener la pizza");

        const data = await res.json();
        if (isMounted) setPizza(data);
      } catch (e) {
        if (isMounted) setError(e.message || "Error desconocido");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPizza();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <div className="container py-4">Cargando pizza...</div>;

  if (error)
    return (
      <div className="container py-4">
        <h5>Error</h5>
        <p>{error}</p>
      </div>
    );

  if (!pizza) return <div className="container py-4">Pizza no encontrada</div>;

  return (
    <div className="container py-4">
      <h1 className="text-capitalize">{pizza.name}</h1>

      <img
        src={pizza.img}
        alt={pizza.name}
        className="img-fluid my-3"
        style={{ maxWidth: 500 }}
      />

      {pizza.desc && <p>{pizza.desc}</p>}

      <h5>Ingredientes:</h5>
      <ul>
        {pizza.ingredients?.map((ing) => (
          <li key={ing} className="text-capitalize">
            {ing}
          </li>
        ))}
      </ul>

      <h4>${pizza.price}</h4>
    </div>
  );
}

