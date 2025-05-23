import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
//import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, handleCardClick, cards }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}&deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {cards
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item, index) => {
              return (
                <ItemCard
                  key={item._id || `${item.name}-${index}`}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
