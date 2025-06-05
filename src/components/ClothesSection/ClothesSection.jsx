import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ handleCardClick }) {
  return (
    <div className="clothes-section">
      <div>
        <p>Your items</p>
        <button>+ Add New</button>
      </div>
      <ul className="clothes-section__list">
        {defaultClothingItems.map((item, index) => {
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
