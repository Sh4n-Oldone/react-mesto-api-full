import React from 'react';

export default function ImagePopup({card, name, onClose}) {

  return (
    <section className={`popup popup-${name}${
      card ? ' popup_opened' : ''
    }`}>
      <div className='popup-image__container'>
        <img src={card.url} alt={card.description} className='popup-image__image'/>
        <p className='popup-image__title'>{card.description}</p>
        <button type='button' className='popup__close-button button-style__reset' onClick={onClose}/>
      </div>
    </section>
  )
}