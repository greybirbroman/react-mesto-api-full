
import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Loader from "./Loader";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelite,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
      <main className="content">
        <section className="profile">
          <div className="profile__person">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Картинка профиля"
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__activity">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__add-button"
            onClick={onAddPlace}
          ></button>
        </section>

        <section className="elements">
          <ul className="elements__list">
            {isLoading ? (
              <Loader />
            ) : (
              cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelite={onCardDelite}
                />
              ))
            )}
          </ul>
        </section>
      </main>
  );
}

export default Main;
