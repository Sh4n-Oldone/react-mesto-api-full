import React from 'react';
import avatarPointer from '../images/edit-profile-icon.svg';
import Card from '../components/Card.js';
import CurrentUserContext from "../context/CurrentUserContext";
import CardsContext from "../context/CardsContext";

export default function Main({
  onEditAvatar, 
  onEditProfile, 
  onAddPlace, 
  onCardClick, 
  onRemoveClickPopup, 
  onLikeClick, 
  onDeleteClick}) {

  return (

    <main className='content'>
      <CurrentUserContext.Consumer>
        {value =>
          <section className='profile'>
            <div className='profile__overlay'>
              <img src={value.avatar}
                   alt={`Фото: ${value.name}`}
                   className='profile__pic'
                   onClick={onEditAvatar}
              />
              <img src={avatarPointer}
                   alt='edit-icon'
                   className='profile__edit-icon'
              />
            </div>
            <div className='profile__info'>
              <div className='profile__wrapper'>
                <h1 className='profile__name'>{`${value.name}`}</h1>
                <button className='profile__edit-button button-style__reset' onClick={onEditProfile}/>
              </div>
              <p className='profile__title'>{`${value.description}`}</p>
            </div>
            <button className='profile__add-button button-style__reset' onClick={onAddPlace}/>
          </section>
        }
      </CurrentUserContext.Consumer>

      <CardsContext.Consumer>
        {cards =>
          <section className='cards'>
            <ul className='cards__list'>
              {cards.map(card =>
                <Card {...card}
                      key={card._id}
                      onCardClick={onCardClick}
                      onRemoveClickPopup={onRemoveClickPopup}
                      onLikeClick={onLikeClick}
                      onDeleteClick={onDeleteClick}
                />
              )}
            </ul>
          </section>
        }
      </CardsContext.Consumer>
    </main>

  );
}
