import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, submitTitle}) {

const currentUser = useContext(CurrentUserContext)

const [inputs, setInputs] = useState({
    name: {value: currentUser.name},
    info: {value: currentUser.about},
})

// Задать полям инпута текущие значения
useEffect(() => {
  setInputs({
      name: {value: currentUser.name},
      info: {value: currentUser.about},
  })
}, [currentUser, isOpen])

const handleChange = (evt) => {
  const {name, value} = evt.target
    setInputs({...inputs, [name]: {value: value}})
    }

const handleSubmit = (evt) => {
    evt.preventDefault()
    onUpdateUser({
        name: inputs.name.value,
        info: inputs.info.value,
    })
}

    return (
        <PopupWithForm
          name={"edit"}
          title={"Редактировать профиль"}
          submitTitle={submitTitle}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <label className="popup__input-label">
            <input
              required
              id="name"
              type="text"
              placeholder="Как Вас зовут?"
              className="popup__input popup__input_place_name"
              minLength="2"
              maxLength="40"
              name="name"
              value={inputs.name.value || ''}
              onChange={handleChange}
            />
            <span className="popup__input-error" id="name-input-error"></span>
          </label>
          <label className="popup__input-label">
            <input
              required
              id="info"
              type="text"
              placeholder="О себе"
              className="popup__input popup__input_place_job"
              minLength="2"
              maxLength="200"
              name="info"
              value={inputs.info.value || ''}
              onChange={handleChange}
            />
            <span className="popup__input-error" id="job-input-error"></span>
          </label>
        </PopupWithForm>
    )
}
export default EditProfilePopup