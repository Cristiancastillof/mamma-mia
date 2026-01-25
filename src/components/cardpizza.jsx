import { Link } from "react-router-dom";

const CardPizza = ({ pizza }) => {
  return (
    <div className="card h-100">
      <img
        src={pizza.img}
        className="card-img-top"
        alt={pizza.name}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-capitalize">{pizza.name}</h5>

        <ul>
          {pizza.ingredients?.map((ing) => (
            <li key={ing} className="text-capitalize">
              {ing}
            </li>
          ))}
        </ul>

        <h5 className="mt-auto">${pizza.price}</h5>

        {/* BOTÓN DETALLE – HITO 7 */}
        <Link
          to={`/pizza/${pizza.id}`}
          className="btn btn-outline-primary mt-2"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default CardPizza;

