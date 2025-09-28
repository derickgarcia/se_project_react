import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function AddItemModal({
  activeModal,
  handleCloseClick,
  isOpen,
  addItem,
}) {
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
  };

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Form data being sent:", { name, imageUrl, weather });
    addItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      titleText="New garment"
      activeModal={activeModal}
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
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
            name="weatherType"
            checked={weather === "hot"}
            required
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            className="modal__radio-input"
            value="warm"
            onChange={handleweatherChange}
            name="weatherType"
            checked={weather === "warm"}
            required
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="cold"
            className="modal__radio-input"
            value="cold"
            onChange={handleweatherChange}
            name="weatherType"
            checked={weather === "cold"}
            required
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
