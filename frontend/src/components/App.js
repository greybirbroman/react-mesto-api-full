import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import InfoToolTip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import api from "../utils/api";
import * as auth from "../utils/auth.js";
// Для PopupMessage
import regSuccess from "../images/regSuccess.svg";
import regFail from "../images/regFail.svg";

function App() {
  let history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [cards, setCards] = useState([]);

  const [avatarPopupSubmitName, setAvatarPopupSubmitName] = useState("Сохранить");
  const [editPopupSubmitName, setEditPopupSubmitName] = useState("Сохранить");
  const [addPlacePopupSubmitName, setAddPlacePopupSubmitName] = useState("Создать");
  const [confirmPopupSubmitName, setConfirmPopupSubmitName] = useState("Да");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [resultMessage, setResultMessage] = useState({ image: null, text: "" });
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isMessagePopupOpen ||
    selectedCard;

  useEffect(() => {
    function closeByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEsc);
      return () => {
        document.removeEventListener("keydown", closeByEsc);
      };
    }
  }, [isOpen]);

  // useEffect(() => {
  //   api
  //     .getUserInfo()
  //     .then((userData) => {
  //       if (userData) console.log("UserData_OK");
  //       setCurrentUser({
  //         name: userData.name,
  //         about: userData.about,
  //         avatar: userData.avatar,
  //         _id: userData._id,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(`UserData_ERR ${err}`);
  //     });
  // }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   api
  //     .getCards()
  //     .then((cardsData) => {
  //       if (cardsData) console.log("CardsData_OK");
  //       setCards(cardsData)
  //     })
  //     .catch((error) => {
  //       console.log(`CardsData_ERR ${error}`);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

// Читаем данные с сервера
  useEffect(() => {
    setIsLoading(true)

    Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData)
      setCards(cardsData)
    })
    .catch((error) => {
      console.log(`DataLoading_ERR ${error}`)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeliteClick(card) {
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setIsMessagePopupOpen(false);
  }
  // Обновление данных пользователя // EditProfilePopup
  function handleUpdateUser({ name, info }) {
    setEditPopupSubmitName("Сохранение...");
    api
      .patchUserProfile({ name, info })
      .then(({ data }) => {
        setCurrentUser({...currentUser, name: data.name, about: data.about});
        setEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка обновления профиля ${err}`);
      })
      .finally(() => {
        setEditPopupSubmitName("Сохранить");
      });
  }
  // Обновление аватара пользователя // EditAvatarPopup
  function handleUpdateAvatar({ avatar }) {
    setAvatarPopupSubmitName("Сохранение...");
    api
      .patchNewAvatar({ avatar })
      .then(({ data }) => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        setEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки аватара ${err}`);
      })
      .finally(() => {
        setAvatarPopupSubmitName("Сохранить");
      });
  }
  // Добавление карточки // AddPlacePopup
  function handleAddPlaceSubmit(card) {
    setAddPlacePopupSubmitName("Добавление...");
    api
      .postNewCard({ name: card.title, link: card.link })
      .then(({ data }) => {
        const newCard = { name: data.name, link: data.link, likes: data.likes, owner: data.owner, _id: data._id }
        setCards([...cards, newCard]);
        setAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки карточки ${err}`);
      })
      .finally(() => {
        setAddPlacePopupSubmitName("Создать");
      });
  }
  // Удаление карточки через ConfirmPopup
  function handleCardDelite(card) {
    setConfirmPopupSubmitName("Удаление...");
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
        setDeletedCard(null);
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки ${err}`);
      })
      .finally(() => {
        setConfirmPopupSubmitName("Да");
      });
  }
  // Установить / Убрать Like
  function handleCardLike(card) {
    const isLiked = (card.likes.some(likeAuthor => likeAuthor === currentUser._id));
    api
      .changeLikeStatus(card._id, !isLiked)
      .then(({ data }) => {
        const changedCard = { name: data.name, link: data.link, likes: data.likes, owner: data.owner, _id: data._id }
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? changedCard : currentCard
          ))
      })
      .catch((err) => {
        console.log(`Ошибка установки like ${err}`);
      });
  }

  const tokenCheck = () => {
      const token = localStorage.getItem('jwt')
      if (!token) {
        return
      }
      auth.checkToken(token)
      .then((res) => {
        if (res) {
          setEmail(res.email)
          setCurrentUser(res)
          setLoggedIn(true)
          history.push('/')
        }
      })
      .catch(() => {
        console.log('Переданный токен некорректен')
        setLoggedIn(false)
      })
      api.getCards()
      .then((res) => {
       setCards(res)
      })
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    tokenCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  function handleRegister(email, password) {
    let messageText = "",
      imageLink = null;

    auth
      .registration(email, password)
      .then((res) => {
        history.push("/sign-in");
        messageText = "Вы успешно зарегестрировались!";
        imageLink = regSuccess;
      })
      .catch((err) => {
        switch (err) {
          case 400:
            messageText = "Некорректно заполнено одно из полей";
            imageLink = regFail;
            break;
          default:
            messageText = "Что-то пошло не так! Попробуйте ещё раз.";
            imageLink = regFail;
        }
      })
      .finally(() => {
        setResultMessage({ image: imageLink, text: messageText });
        setIsMessagePopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    return auth
      .authorization(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        let messageText = "",
          imageLink = regFail;
        switch (err) {
          case 400:
            messageText = "Не передано одно из полей";
            break;
          case 401:
            messageText = `Пользователь ${email} не найден`;
            break;
          default:
            messageText = "Что-то пошло не так! Попробуйте ещё раз.";
        }
        setResultMessage({ image: imageLink, text: messageText });
        setIsMessagePopupOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setEmail(null);
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header email={email} onLogout={handleLogout} />
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} history={history} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} history={history} />
            </Route>
            <ProtectedRoute
              path="/"
              cards={cards}
              component={Main}
              loggedIn={isLoggedIn}
              isLoading={isLoading}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelite={handleDeliteClick}
            />
            <Route path="*">
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          {isMessagePopupOpen && (
            <InfoToolTip
              onClose={closeAllPopups}
              imageLink={resultMessage.image}
              textMessage={resultMessage.text}
            />
          )}
          <Footer />
          {selectedCard && (
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          )}

          <EditProfilePopup
            submitTitle={editPopupSubmitName}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            submitTitle={avatarPopupSubmitName}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            submitTitle={addPlacePopupSubmitName}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ConfirmPopup
            submitTitle={confirmPopupSubmitName}
            card={deletedCard}
            onConfirm={handleCardDelite}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
