import "./Main.css";
import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext";
//import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}
          &deg;{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
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
