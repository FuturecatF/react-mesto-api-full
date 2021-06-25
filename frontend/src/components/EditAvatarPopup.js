import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, isSaving, onUpdateAvatar }) {
  const avatarUser = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarUser.current.value,
    });
    
  }

  React.useEffect(() => {
    avatarUser.current.value = "";
  }, [isOpen])

  return (
    <PopupWithForm
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      isSaving={isSaving}
      onSubmit={handleSubmit}
    >
      <input
        className='popup__input popup__input_type_avatar-link'
        type='url'
        id='avatar-link'
        name='avatar-image'
        autoComplete='on'
        placeholder='Ссылка на картинку'
        ref={avatarUser}
        required
      />
      <div className='popup__error-container'>
        <span className='popup__input-error' id='avatar-link-error'></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
