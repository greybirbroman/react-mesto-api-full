import React, { useEffect, useState } from "react";

const InfoToolTip = ({ onClose, imageLink, textMessage }) => {
  const [popupOpenClass, setPopupOpenClass] = useState("");

  const handleCloseClick = () => {
    setPopupOpenClass("");
    onClose();
  };

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) handleCloseClick();
  };

  useEffect(() => {
    setPopupOpenClass("popup_open");
  }, []);

  return (
    <div className={`popup ${popupOpenClass}`} onClick={handleOverlayClose}>
      <div className="popup__body">
        <button
          type="button"
          className="popup__close"
          title="Закрыть форму"
          onClick={handleCloseClick}
        />

        <div className="popup__message-box">
          <img
            className="popup__message-icon"
            src={imageLink}
            alt={textMessage}
          />
          <p className="popup__message-text">{textMessage}</p>
        </div>
      </div>
    </div>
  );
}
export default InfoToolTip
