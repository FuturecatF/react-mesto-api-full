import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import successIcon from "../images/successIcon.svg";
import errorIcon from "../images/errorIcon.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setInitialCards] = React.useState([]);
  const [isSaving, setIsSaving] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState({});
  const [message, setMessage] = React.useState({ img: "", text: "" });
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setInitialCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setInitialCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
    setDeletedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardDelete() {
    setIsSaving(true);

    api
      .deleteCard(deletedCard._id)

      .then(() => {
        setInitialCards((cards) =>
          cards.filter((c) => c._id !== deletedCard._id)
        );
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setIsSaving(false));
  }

  function handleUpdateUser(data) {
    setIsSaving(true);
    api
      .setUserProfile(data)
      .then((data) => setCurrentUser(data))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setIsSaving(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsSaving(true);
    api
      .setUserAvatar(avatar)
      .then((avatar) => setCurrentUser(avatar))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setIsSaving(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsSaving(true);
    api
      .postNewCard(card)
      .then((card) => setInitialCards([card, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => setIsSaving(false));
  }

  function handleInfoTooltipContent({ img, text }) {
    setMessage({ img: img, text: text });
  }

  function onRegister(email, password) {
    auth
      .getRegister(password, email)
      .then(() => {
        handleInfoTooltipContent({
          img: successIcon,
          text: "Вы успешно зарегистрировались!",
        });

        setIsInfoTooltipPopupOpen(true);
        history.push("/sign-in");
        setTimeout(closeAllPopups, 2500);
      })
      .catch((err) => {
        handleInfoTooltipContent({
          img: errorIcon,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function onLogin(email, password) {
    auth
      .getLogin(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.status);
        if (err.status === 400) {
          return console.log("не передано одно из полей");
        } else if (err.status === 401) {
          return console.log("пользователь с email не найден");
        }
        return console.log(err.status);
      });
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setEmail(data.data.email);
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err.status);
          if (err.status === 401) {
            return console.log("Переданный токен некорректен ");
          } else if (!jwt) {
            return console.log("Токен не передан или передан не в том формате");
          }
          return console.log("error 500");
        });
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEmail("");
    history.push("/sign-in");
  }

  return (
    <div className='page'>
      <div className='page__container'>
        <CurrentUserContext.Provider value={currentUser}>
          <Header onSignOut={onSignOut} email={email} />

          <Switch>
            <ProtectedRoute
              exact
              path='/'
              component={Main}
              isLoggedIn={isLoggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              onCardClick={handleCardClick}
            />

            <Route path='/sign-in'>
              <Login onLogin={onLogin} />
            </Route>
            <Route path='/sign-up'>
              <Register onRegister={onRegister} />
            </Route>
            <Route path='/'>
              {isLoggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
            </Route>
          </Switch>

          {isLoggedIn && <Footer />}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isSaving={isSaving}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isSaving={isSaving}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isSaving={isSaving}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
            isSaving={isSaving}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            message={message}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
