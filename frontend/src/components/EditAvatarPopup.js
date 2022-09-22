import { useContext, useEffect, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, submitTitle }) {
    const currentUser = useContext(CurrentUserContext)
    const inputRef = useRef()

    // Обнуление поля инпута для ссылки на Аватар при открытии
    useEffect(() => {
      if(!isOpen) {
        inputRef.current.value = currentUser.avatar
      } else {
        inputRef.current.value = ''
      }
    }, [currentUser, isOpen])

    const handleSubmit = (evt) => {
        evt.preventDefault()
        onUpdateAvatar({avatar: inputRef.current.value})
    }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить автар"}
      submitTitle={submitTitle}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-label">
        <input
          required
          id="avatar"
          ref={inputRef}
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_place_avatar"
          minLength="2"
          maxLength="200"
          name="avatar"
        />
        <span className="popup__input-error" id="avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup
