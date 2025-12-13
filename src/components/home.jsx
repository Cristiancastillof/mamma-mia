import CardPizza from "./CardPizza";
import { pizzas } from "../assets/pizzas";

const Home = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Pizzas</h1>

      <div className="row">
        {pizzas.map((pizza) => (
          <div className="col-md-4" key={pizza.id}>
            <CardPizza
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              img={pizza.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
