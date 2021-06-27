import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ data, onCardLike, onCardDelete, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = data.owner === currentUser.id;
 
  const isLiked = data.likes.some(i => i === currentUser.id);
 
  const cardDeleteButtonClassName = `element__delete-icon ${
    isOwn ? "element__delete-icon" : ""
  }`;
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(data);
  }

  function handleDeleteClick() {
    onCardDelete(data);
  };

  function handleClick() {
    onCardClick(data);
  }

  return (
    <li className='element'>
      <div onClick={handleClick}>
        <img className='element__photo' src={data.link} alt={data.name} />
      </div>
      {isOwn && <button
        className={cardDeleteButtonClassName}
        type='button'
        aria-label='Удалить'
        onClick={handleDeleteClick}
      ></button> }
      <div className='element__footer'>
        <h2 className='element__subtitle'>{data.name}</h2>
        <div className='element__likes-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            aria-label='Лайк'
            onClick={handleLikeClick}
          ></button>
          <span className='element__count-likes'>{data.likes.length}</span>
        </div>
      </div>
    </li>
  );


}

export default Card;
