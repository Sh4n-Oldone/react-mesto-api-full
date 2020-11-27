import React from 'react';

const Card = (card) => {
  function handleClick() {
    card.onCardClick({url: card.link, description: card.name});
  }
  return (
    <li className='card'>
      <button
        className={
          `card__remove-button button-style__reset 
          ${card.owner === card.currentUser._id ? 'card__remove-button_visible' : 'card__remove-button_hide'}`}
        onClick={() => {card.onDeleteClick(card)}}/>
      <img className='card__image' src={card.link} alt={card.name} onClick={handleClick} />
      <div className='card__item'>
        <h3 className='card__title'>{card.name}</h3>
        <div className='card__like-container'>
          <button
            className={
              `card__like-button button-style__reset
              ${card.likes.some(i => i === card.currentUser._id) ? ' card__like-button_pressed' : ''}`
            }
            onClick={() => {card.onLikeClick(card)}}/>
          <p className='card__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </li>
  )

};

export default Card;