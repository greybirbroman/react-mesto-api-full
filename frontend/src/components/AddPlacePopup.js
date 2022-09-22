import {useEffect, useState} from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({isOpen, onClose, onAddPlace, submitTitle}) {

const [inputs, setInputs] = useState({
    title: {value: ''},
    link: {value: ''},
})

// Обнулить поля инпута при открытии 
useEffect(() => {
    setInputs({
        title: {value: ''},
        link: {value: ''},
    })
}, [isOpen])

const handleSubmit = (evt) => {
    evt.preventDefault()
    onAddPlace({
        title: inputs.title.value,
        link: inputs.link.value,
    })
}
const handleChange = (evt) => {
    const {name, value} = evt.target
    setInputs({...inputs, [name]: {value: value}})
}

    return (
        <PopupWithForm
          name={"add"}
          title={"Новое место"}
          submitTitle={submitTitle}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <label className="popup__input-label">
            <input
              required
              id="title"
              type="text"
              placeholder="Название"
              className="popup__input popup__input_place_title"
              minLength="2"
              maxLength="30"
              name="title"
              value={inputs.title.value}
              onChange={handleChange}
            />
            <span className="popup__input-error" id="title-input-error"></span>
          </label>
          <label className="popup__input-label">
            <input
              required
              id="link"
              type="url"
              placeholder="Ссылка на картинку"
              className="popup__input popup__input_place_link"
              name="link"
              value={inputs.link.value}
              onChange={handleChange}
            />
            <span className="popup__input-error" id="link-input-error"></span>
          </label>
        </PopupWithForm>
    )
}
export default AddPlacePopup