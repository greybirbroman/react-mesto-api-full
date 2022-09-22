import { useState, useEffect } from "react";

function ImagePopup({ card, onClose }) {
  const [popupOpenClass, setPopupOpenClass] = useState('');

  const handleCloseClick = () => {
    setPopupOpenClass('');
    onClose();
  };
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) handleCloseClick();
  };

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") handleCloseClick();
    };
    document.addEventListener("keydown", handleEscClose);
    setPopupOpenClass("popup_open");

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []); // эксперимент

  return (
    <div
      className={`popup popup_type_open-card ${popupOpenClass}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__card-container">
        <div className="popup__placement">
          <img src={card.link} alt={card.name} className="popup__image"/>
          <p className="popup__alt">{card.name}</p>
        </div>
        <button
          type="button"
          className="popup__close"
          onClick={handleCloseClick}
        ></button>
      </div>
    </div>
  );
}
export default ImagePopup;
