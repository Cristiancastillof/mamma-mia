import React from "react";

const CardPizza = ({ name, price, ingredients = [], img }) => {

  return (
    <div className="card card-pizza h-100">
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text mb-1"><strong>Precio:</strong> ${price.toLocaleString('es-CL')}</p>
        <p className="card-text"><strong>Ingredientes:</strong> {ingredients.join(", ")}</p>
        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-outline-primary">Ver más</button>
          <button className="btn btn-primary">Añadir</button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
