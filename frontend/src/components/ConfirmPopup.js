import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ card, onClose, onConfirm, submitTitle }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onConfirm(card);
  };

  return (
    <PopupWithForm
    name={"confirm"}
    title={"Вы уверены?"}
    isOpen={card}
    onClose={onClose}
    submitTitle={submitTitle}
    onSubmit={handleSubmit}>
    </PopupWithForm>
  );
}
export default ConfirmPopup;
