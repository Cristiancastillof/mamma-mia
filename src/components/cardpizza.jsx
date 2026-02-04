import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function CardPizza({ pizza }) {
  // 🛡️ Evita pantalla en blanco si llega undefined por cualquier motivo
  if (!pizza) return null;

  const { addToCart } = useContext(CartContext);

  return (
    <div className="card h-100">
      <img
        src={pizza.img || ""}
        className="card-img-top"
        alt={pizza.name || "pizza"}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-capitalize">{pizza.name}</h5>

        <p className="mb-2">
          <strong>${pizza.price}</strong>
        </p>

        {/* Si quieres mostrar ingredientes (opcional) */}
        {Array.isArray(pizza.ingredients) && pizza.ingredients.length > 0 && (
          <ul className="mb-3">
            {pizza.ingredients.map((ing) => (
              <li key={ing} className="text-capitalize">
                {ing}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto d-flex gap-2">
          <Link
            to={`/pizza/${pizza.id}`}
            className="btn btn-outline-primary w-50"
          >
            Ver más
          </Link>

          <button
            type="button"
            className="btn btn-primary w-50"
            onClick={() => addToCart(pizza)}
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
