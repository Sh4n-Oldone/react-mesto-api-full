import React from 'react';

export default function PopupWithForm(props) {

  return (
    <>
      <section className={`popup popup-${props.name}${
        props.isOpen ? ' popup_opened' : ''
      }`}
      >
        <div className='popup__container'>
          <h2 className='popup__title'>{props.title}</h2>
          <form className='popup__form'
                name={props.name}
                onSubmit={props.onSubmit}
          >
            {props.children}
            <button type='submit'
                    className='popup__save-button button-style__reset'
            >Сохранить</button>
          </form>
          <button type='button'
                  className='popup__close-button button-style__reset'
                  onClick={props.onClose}
          />
        </div>
      </section>
    </>
  );
}