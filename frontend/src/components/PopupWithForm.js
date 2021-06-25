import React from "react";

function PopupWithForm({
  children,
  isOpen,
  title,
  onSubmit,
  isSaving,
  onClose,
  buttonText,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container'>
        <h2 className='popup__title'>{title}</h2>
        <form className='popup__form' onSubmit={onSubmit} noValidate>
          {children}
          <button
            className='popup__button'
            type='submit'
            disabled={isSaving ? true : false}
          >
            {isSaving ? "Загрузка..." : buttonText}
          </button>
        </form>
        <button
          className='popup__close popup__close_type_edit'
          type='button'
          aria-label='Закрыть форму'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
