import avatar from "../../assets/avatar.svg";
import "./SideBar.css";

function SideBar({ handleEditProfileClick }) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditProfileClick}
          id="edit-profile"
          name="edit-profile"
          className="sidebar__edit-profile"
        >
          Edit Profile
        </button>
        <button className="sidebar__logout">Log Out</button>
      </div>
    </div>
  );
}

export default SideBar;
