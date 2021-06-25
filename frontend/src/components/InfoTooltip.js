function InfoTooltip({ onClose, isOpen, message }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container'>
        <img src={message.img} alt='Регистрация' className='popup__auth-img' />
        <p className='popup__subtitle'>{message.text}</p>
        <button
          className='popup__close'
          type='button'
          aria-label='Закрыть форму'
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
