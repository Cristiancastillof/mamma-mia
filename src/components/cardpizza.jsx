const CardPizza = ({ pizza }) => {
  return (
    <div className="card h-100">
      <img src={pizza.img} className="card-img-top" alt={pizza.name} />
      <div className="card-body">
        <h5 className="card-title text-capitalize">{pizza.name}</h5>

        <ul>
          {pizza.ingredients?.map((ing) => (
            <li key={ing} className="text-capitalize">
              {ing}
            </li>
          ))}
        </ul>

        <h5>${pizza.price}</h5>
      </div>
    </div>
  );
};

export default CardPizza;

