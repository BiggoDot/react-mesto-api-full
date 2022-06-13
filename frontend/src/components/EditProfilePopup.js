import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });

    }

    return (
        <PopupWithForm title={'Редактировать профиль'} onClose={props.onClose} isOpen={props.isOpen}
                       onSubmit={handleSubmit}
                       name={'profile'} buttonText={'Сохранить'}>
            <input type="text" placeholder="Имя" className="popup__input popup__input_for_name" id="name"
                   name="name" value={name || ''} onChange={handleNameChange}
                   minLength="2" maxLength="40" required/>
            <span className="popup__input-error name-error"></span>
            <input type="text" placeholder="Описание" className="popup__input popup__input_for_description"
                   id="description"
                   name="description" value={description || ''} onChange={handleDescriptionChange} minLength="2"
                   maxLength="200" required/>
            <span className="popup__input-error description-error"></span>
        </PopupWithForm>
    );
};

export default EditProfilePopup;