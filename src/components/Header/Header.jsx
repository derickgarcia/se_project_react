import "./Header.css";
import logo from "../../assets/logo.svg";
// import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  //const isLoggedIn = !!currentUser;
  const name = currentUser?.name || "";
  const avatar = currentUser?.avatar || "";
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <div className="header__user-info">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
            name="add-garment"
            id="add-garment"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__user-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              {avatar ? (
                <img
                  src={avatar}
                  alt="User avatar"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-intial">{firstLetter}</div>
              )}
            </div>
          </Link>
        </div>
      ) : (
        <div className="header__auth-btns">
          <button
            onClick={handleRegisterClick}
            type="button"
            name="register"
            id="register"
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginClick}
            type="button"
            name="login"
            id="login"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
