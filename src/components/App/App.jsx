import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { coordinates, APIkey } from "../../utils/constants";
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItems, deleteItems } from "../../utils/api";
import { signup, signin, checkToken, updateUser } from "../../utils/auth";
import "../../vendor/font.css";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// import { isFormElement } from "react-router-dom/dist/dom";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    avatar: "",
  });

  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const navigate = useNavigate();

  const handleRegistration = ({ name, avatar, email, password }) => {
    signup({ name, password, email, avatar })
      .then((res) => {
        console.log(res);
        closeActiveModal();
        return signin({ email, password });
      })
      .then((loginRes) => {
        localStorage.setItem("jwt", loginRes.token);
        setCurrentUser(loginRes.user);
      })
      .catch(console.error);
  };

  const handleLogIn = ({ email, password }) => {
    auth
      .signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogOut = ({}) => {
    localStorage.removeItem("jwt");
    setCurrentUser({ email: "", name: "", avatar: "" });
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddSubmit = ({ name, imageUrl, weather }) => {
    const newItem = {
      _id: Date.now().toString(),
      name,
      imageUrl,
      weather,
    };

    addItems(newItem)
      .then((data) => {
        setClothingItems((prevItems) => [data, ...prevItems]);
        setSelectedCard(data);
        //localStorage.setItem(
        //  "clothingItems",
        //  JSON.stringify([data, ...clothingItems])
        //);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    auth
      .updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteItems = () => {
    deleteItems(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  /*useEffect(() => {
    const savedItems = localStorage.getItem("clothingItems");
    if (savedItems) {
      setClothingItems(JSON.parse(savedItems));
    } else {
      setClothingItems(defaultClothingItems);
    }
  }, []);*/

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      setIsLoggedIn(false);
      return;
    }
    auth
      .checkToken(jwt)
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error(error);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          <RegisterModal
            isOpen={activeModal === "register"}
            handleCloseClick={closeActiveModal}
            onLogin={handleLoginClick}
            onSubmit={handleRegistration}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleCloseClick={closeActiveModal}
            onRegister={handleRegisterClick}
            onSubmit={handleLogIn}
          />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            addItem={handleAddSubmit}
            handleCloseClick={closeActiveModal}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={closeActiveModal}
            handleDeleteClick={handleDeleteClick}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            handleCloseClick={closeActiveModal}
            onSubmit={handleEditProfile}
          />

          <DeleteModal
            activeModal={activeModal}
            isOpen={activeModal === "delete"}
            handleCloseClick={closeActiveModal}
            onDelete={handleDeleteItems}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
