import "./ItemCard.css";
import heart from "../../assets/heart.svg";

function ItemCard({ item, onCardClick, onCardLike, currentUser }) {
  const isLoggedIn = !!currentUser;

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const itemLikeButton = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {isLoggedIn && (
        <button className={itemLikeButton} onClick={handleLike} type="button">
          <img className="card__like-btn" src={heart} alt="heart-icon" />
        </button>
      )}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
