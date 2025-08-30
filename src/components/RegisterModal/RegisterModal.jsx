import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function RegisterModal({
  activeModal,
  handleCloseClick,
  onLogin,
  onSubmit,
  isOpen,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlenameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({ name, avatar, email, password });
  };

  useEffect(() => {
    setName("");
    setAvatar("");
    setEmail("");
    setPassword("");
  }, [isOpen]);

  /* const handleSubmit = (evt) => {
    evt.preventDefault();
    addProfile({ name, avatar, email, password });
  }; */

  return (
    <ModalWithForm
      buttonText="Sign Up"
      titleText="Sign Up"
      activeModal={activeModal}
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
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
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="avatarUrl"
          name="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
      <button
        onClick={onLogin}
        type="button"
        id="login"
        name="login"
        className="login-switch_btn"
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}
