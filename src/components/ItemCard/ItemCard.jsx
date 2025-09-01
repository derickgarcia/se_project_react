import "./ItemCard.css";
import heart from "../../assets/heart.svg";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img className="card__like-btn" src={heart} alt="heart-icon" />
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
