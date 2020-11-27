import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, handleNewPlace}) {

  const [place, setPlace] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  const handlePlaceInput = (event) => {setPlace(event.target.value)}
  const handlePlaceLinkInput = (event) => {setPlaceLink(event.target.value)}

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewPlace({
      name: place,
      link: placeLink
    });
  }

  useEffect(() => {
    if (isOpen === false) {
      setPlace('');
      setPlaceLink('');
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
        value={place || ''}
        type='text'
        name='name'
        placeholder='Название'
        className='popup__input popup__input_name'
        minLength='1'
        maxLength='30'
        onChange={handlePlaceInput}
        required
      />
      <small className='popup__input_type_error input_title_error-message'/>
      <input
        value={placeLink || ''}
        type='url'
        name='link'
        placeholder='Ссылка на карточку'
        className='popup__input popup__input_title'
        onChange={handlePlaceLinkInput}
        required
      />
    </PopupWithForm>

  )
}