import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}
    >
      <figure className='photo'>
        <button
          className='popup__close'
          type='button'
          aria-label='Закрыть попап'
          onClick={onClose}
        ></button>
        <img className='photo__item' src={card.link} alt={card.name} />
        <figcaption className='photo__subtitle'>{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
