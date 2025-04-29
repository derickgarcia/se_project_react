import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import "../../vendor/font.css";
import { defaultClothingItems } from "../../utils/constants";
import Footer from "../Footer/Footer";
//import { use } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handlenameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleimageUrlChange = (evt) => {
    setImageUrl(evt.target.value);
  };
  const handleweatherChange = (evt) => {
    setWeather(evt.target.value);

    document.querySelectorAll(".modal__label_type_radio").forEach((input) => {
      input.classList.remove("selected-radio");
    });
    evt.target.classList.add("selected-radio");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const newItem = {
      _id: Date.now().toString(),
      name,
      link: imageUrl,
      weather,
    };

    const updatedItems = [...clothingItems, newItem];
    setClothingItems(updatedItems);
    localStorage.setItem("clothingItems", JSON.stringify(updatedItems));

    setName("");
    setImageUrl("");
    setWeather("");
    closeActiveModal();
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const savedItems = localStorage.getItem("clothingItems");
    if (savedItems) {
      setClothingItems(JSON.parse(savedItems));
    } else {
      setClothingItems(defaultClothingItems);
    }
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          cards={clothingItems}
        />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        titleText="New garment"
        activeModal={activeModal}
        handleCloseClick={closeActiveModal}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handlenameChange}
            required
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageURL"
            name="imageURL"
            placeholder="Image URL"
            value={imageUrl}
            onChange={handleimageUrlChange}
            required
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              id="hot"
              className="modal__radio-input"
              value="hot"
              onChange={handleweatherChange}
              checked={weather === "hot"}
              required
            />{" "}
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id="warm"
              className="modal__radio-input"
              value="warm"
              onChange={handleweatherChange}
              checked={weather === "warm"}
              required
            />{" "}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id="cold"
              className="modal__radio-input"
              value="cold"
              onChange={handleweatherChange}
              checked={weather === "cold"}
              required
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCloseClick={closeActiveModal}
      />
      <Footer />
    </div>
  );
}

export default App;
