import React, {useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const [name, setName] = React.useState('Жак-Ив Кусто')
  const [description, setDescription] = React.useState('Исследователь океана')

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.description);
  }, [currentUser]);

  const handleInputName = (event) => {
    setName(event.target.value)
  }

  const handleInputDescription = (event) => {
    setDescription(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    })
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <small className='popup__input_type_error input_name_error-message'/>
      <input type='text'
             name={'profile'}
             value={name}
             placeholder='Ваше имя'
             className='popup__input popup__input_name'
             minLength='2'
             maxLength='40'
             required
             onChange={handleInputName}
      />
      <small className='popup__input_type_error input_title_error-message'/>
      <input type='text'
             name={'Редактировать профиль'}
             value={description}
             placeholder='Ваша работа'
             className='popup__input popup__input_title'
             minLength='2'
             maxLength='200'
             required
             onChange={handleInputDescription}
      />
    </PopupWithForm>
  )
}