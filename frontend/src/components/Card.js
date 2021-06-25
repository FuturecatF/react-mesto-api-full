import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardLike, onCardDelete, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardDeleteButtonClassName = `element__delete-icon ${
    isOwn ? "element__delete-icon" : ""
  }`;
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className='element'>
      <div onClick={handleClick}>
        <img className='element__photo' src={card.link} alt={card.name} />
      </div>
      {isOwn && <button
        className={cardDeleteButtonClassName}
        type='button'
        aria-label='Удалить'
        onClick={handleDeleteClick}
      ></button> }
      <div className='element__footer'>
        <h2 className='element__subtitle'>{card.name}</h2>
        <div className='element__likes-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Лайк'
            onClick={handleLikeClick}
          ></button>
          <span className='element__count-likes'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
