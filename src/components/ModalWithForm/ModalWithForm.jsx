import "./ModalWithForm.css";
import { useEffect, useState, useRef } from "react";
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
  /* useEffect(() => {
    const form = document.querySelector(".modal__form");
    if (form) {
      setIsValid(form.checkValidity());
    }
  }, [children]); */
  const formRef = useRef(null);
  const checkFormValidity = () => {
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  };

  useEffect(() => {
    checkFormValidity();
  }, [children, isOpen]);

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
        <form
          ref={formRef}
          className="modal__form"
          onSubmit={onSubmit}
          onChange={checkFormValidity}
        >
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
