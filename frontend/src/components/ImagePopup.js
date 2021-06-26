import React from "react";

function ImagePopup({ data, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${data.link ? "popup_opened" : ""}`}
    >
      <figure className='photo'>
        <button
          className='popup__close'
          type='button'
          aria-label='Закрыть попап'
          onClick={onClose}
        ></button>
        <img className='photo__item' src={data.link} alt={data.name} />
        <figcaption className='photo__subtitle'>{data.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
