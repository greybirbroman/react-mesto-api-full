
function PopupWithForm(props) {
  const openClass = props.isOpen && "popup_open";
  const handleClosePopup = props.onClose;

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) handleClosePopup();
  };

  return (
    <div
      className={`popup popup_type_${props.name} ${openClass}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__body">
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.name}
          className={`popup__form popup__form_type_${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}

          <button type="submit" className="popup__submit">
            {props.submitTitle}
          </button>
        </form>
        <button
          type="button"
          className="popup__close"
          onClick={handleClosePopup}
        ></button>
      </div>
    </div>
  );
}
export default PopupWithForm;
