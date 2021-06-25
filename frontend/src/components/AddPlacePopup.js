import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose, isSaving }) {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: image,
    });
  }

  React.useEffect(() => {
    setName("");
    setImage("");
  }, [isOpen])

  return (
    <PopupWithForm
      title='Новое место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      isSaving={isSaving}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={handleChangeName}
        className='popup__input popup__input_type_card-name'
        type='text'
        id='card-name'
        name='image-name'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
      />
      <div className='popup__error-container'>
        <span className='popup__input-error' id='card-name-error'></span>
      </div>
      <input
        value={image}
        onChange={handleChangeDescription}
        className='popup__input popup__input_type_card-link'
        type='url'
        id='card-link'
        name='link'
        autoComplete='on'
        placeholder='Ссылка на картинку'
        required
      />
      <div className='popup__error-container'>
        <span className='popup__input-error' id='card-link-error'></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
