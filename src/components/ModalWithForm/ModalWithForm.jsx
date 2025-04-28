import "./ModalWithForm.css";
import { useEffect, useState } from "react";
import close from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  activeModal,
  handleCloseClick,
  onSubmit,
}) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const nameInput = document.getElementById("name");
    const linkInput = document.getElementById("imageURL");
    const radioButtons = document.querySelectorAll(".modal__radio-input");

    const checkInputs = () => {
      const nameValid = nameInput.validity.valid;
      const linkValid = linkInput.validity.valid;
      const radioValid = Array.from(radioButtons).some(
        (radio) => radio.checked
      );

      setIsValid(nameValid && linkValid && radioValid);
    };

    nameInput.addEventListener("input", checkInputs);
    linkInput.addEventListener("input", checkInputs);
    radioButtons.forEach((radio) => {
      radio.addEventListener("change", checkInputs);
    });

    return () => {
      nameInput.removeEventListener("input", checkInputs);
      linkInput.removeEventListener("input", checkInputs);
      radioButtons.forEach((radio) => {
        radio.removeEventListener("change", checkInputs);
      });
    };
  }, []);

  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={close} alt="Close-icon" className="modal__close-icon" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            disabled={!isValid}
            type="submit"
            className={`modal__submit-btn ${
              !isValid ? "modal__submit-btn_disabled" : ""
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
