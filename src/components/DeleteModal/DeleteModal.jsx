import "./DeleteModal.css";
import close from "../../assets/close.svg";

function DeleteModal({
  activeModal,
  handleCloseClick,
  //handleDeleteClick,
  onDelete,
}) {
  return (
    <div className={`modal ${activeModal === "delete" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_delete">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          <img src={close} alt="close-icon" className="modal__close-icon" />
        </button>
        <p className="delete__message">
          Are you sure you want to delete this item? <br /> This action is
          irreversible.
        </p>
        <div className="delete__actions">
          <button className="delete__confirm-button" onClick={onDelete}>
            Yes, delete item
          </button>
          <button className="delete__cancel-button" onClick={handleCloseClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
