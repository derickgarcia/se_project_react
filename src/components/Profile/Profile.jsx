import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <button
        onClick={handleEditProfileClick}
        id="edit-profile"
        name="edit-profile"
        className="profile__edit"
      >
        Edit Profile
      </button>
      <button className="profile__logout">Log Out</button>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={handleCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
