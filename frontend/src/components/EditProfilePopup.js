import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose, isSaving }) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      isSaving={isSaving}
      onSubmit={handleSubmit}
    >
      <input
        value={name || ""}
        onChange={handleChangeName}
        className='popup__input popup__input_type_profile-name'
        type='text'
        id='profile-name'
        name='name'
        minLength='2'
        maxLength='40'
        placeholder='Имя'
        required
      />
      <div className='popup__error-container'>
        <span className='popup__input-error' id='profile-name-error'></span>
      </div>

      <input
        value={description || ""}
        onChange={handleChangeDescription}
        className='popup__input popup__input_type_profile-job'
        type='text'
        id='profile-job'
        name='job'
        minLength='2'
        maxLength='200'
        placeholder='О себе'
        required
      />
      <div className='popup__error-container'>
        <span className='popup__input-error' id='profile-job-error'></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
