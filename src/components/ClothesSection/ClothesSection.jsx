import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
//import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ handleCardClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button className="clothes-section__button">+ Add New</button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item, index) => {
          return (
            <ItemCard
              key={item._id || `${item.name}-${index}`}
              item={item}
              handleCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
