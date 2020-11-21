import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const refInput = useRef(null)
  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateAvatar({
      avatar: refInput.current.value
    });
  }

  useEffect(() => {
    if (isOpen === false) {
      refInput.current.value = '';
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
        ref={refInput}
        type='url'
        name='avatar'
        defaultValue={''}
        placeholder='Ссылка на аватар'
        className='popup__input popup__input_title'
        required
      />
    </PopupWithForm>
  )
}