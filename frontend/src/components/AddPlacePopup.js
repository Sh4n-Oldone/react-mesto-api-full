import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, handleNewPlace}) {

  const refInputName = useRef(null)
  const refInputUrl = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewPlace({
      name: refInputName.current.value,
      link: refInputUrl.current.value
    });
  }

  useEffect(() => {
    if (isOpen === false) {
      refInputName.current.value = '';
      refInputUrl.current.value = '';
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <small
        className='popup__input_type_error input_name_error-message'
      />
      <input
        ref={refInputName}
        type='text'
        name='name'
        defaultValue={''}
        placeholder='Название'
        className='popup__input popup__input_name'
        minLength='1'
        maxLength='30'
        required
      />
      <small className='popup__input_type_error input_title_error-message'/>
      <input
        ref={refInputUrl}
        type='url'
        name='link'
        defaultValue={''}
        placeholder='Ссылка на карточку'
        className='popup__input popup__input_title'
        required
      />
    </PopupWithForm>

  )
}