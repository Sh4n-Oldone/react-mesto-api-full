import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const [avatar, setAvatar] = useState('')
  const handleAvatarInput = (event) => {setAvatar(event.target.value)}

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatar
    });
  }

  useEffect(() => {
    if (isOpen === false) {
      setAvatar('');
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Новый аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <small
        className='popup__input_type_error input_title_error-message'
      />
      <input
        value={avatar || ''}
        type='url'
        name='avatar'
        placeholder='Ссылка на аватар'
        className='popup__input popup__input_title'
        onChange={handleAvatarInput}
        required
      />
    </PopupWithForm>
  )
}