import "./ModalWithForm.css";
import { useEffect, useState } from "react";
import close from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  isOpen,
  handleCloseClick,
  onSubmit,
}) {
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    const form = document.querySelector(".modal__form");
    if (form) {
      setIsValid(form.checkValidity());
    }
  }, [children]);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
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
