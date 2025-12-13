const CardPizza = ({ name, price, ingredients, img }) => {
  return (
    <div className="card mb-4">
      <img src={img} className="card-img-top" alt={name} />

      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <ul className="mb-3">
          {ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>

        <h6 className="mb-0">Precio: ${price}</h6>
      </div>
    </div>
  );
};

export default CardPizza;
