import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelite }) {

  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner === currentUser._id
  const isLiked = card.likes.some((likeAuthor) => likeAuthor === currentUser._id)
  const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_type_active' : ''}`

    function handleClick() {
        onCardClick(card)
      }

    function handleLike() {
        onCardLike(card)
      }
    
    function handleDelite() {
      onCardDelite(card)
    }
    
  return (
    <li className="element">
      <button type="button" className="element__delite-button" disabled={!isOwn} hidden={!isOwn} onClick={handleDelite}></button>
      <img src={card.link} alt={card.name} onClick={handleClick} className="element__image" />
      <div className="element__container">
        <h3 className="element__name">{card.name}</h3>
        <div className="element__like">
          <button type="button" onClick={handleLike} className={cardLikeButtonClassName}></button>
          <span className="element__like-button-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
export default Card;
