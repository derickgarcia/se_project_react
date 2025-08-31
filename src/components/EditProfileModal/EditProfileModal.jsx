import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function EditProfileModal({
  isOpen,
  handleCloseClick,
  onSubmit,
  currentUser,
}) {
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handlenameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleAvatarChange = (evt) => {
    setAvatar(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({ name, avatar });
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      buttonText="Save changes"
      titleText="Change profile data"
      // activeModal={activeModal}
      handleCloseClick={handleCloseClick}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name *{" "}
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
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar *{" "}
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
    </ModalWithForm>
  );
}
