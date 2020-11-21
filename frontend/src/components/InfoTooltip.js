import React from 'react';

export default function InfoTooltip({isOpen, onClose, isError}) {
  return (
    <>
      <section className={`info-tooltip${isOpen ? ' info-tooltip_opened' : ''}`}>
        <div className='info-tooltip__container'>
          <div
            className={`info-tooltip__image${isError 
              ? ' info-tooltip__image_error' 
              : ' info-tooltip__image_normal'}`}
          />
          <p className='info-tooltip__subtitle'>
          {isError 
            ? 'Что-то пошло не так! Попробуйте ещё раз.' 
            : 'Вы успешно зарегистрировались!'}  
          </p>
          <button
          type='button'
          className='popup__close-button button-style__reset'
          onClick={onClose}
        />
        </div>
      </section>
    </>
  )
};