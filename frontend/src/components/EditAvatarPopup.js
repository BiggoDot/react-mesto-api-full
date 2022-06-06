import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef('');

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm title={'Обновить аватар'} onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}
                       name={'avatar'} buttonText={'Сохранить'}>
            <input type="url" placeholder="Ссылка на картинку" ref={avatarRef}
                   className="popup__input popup__input_for_avatar" id="avatar" name="avatar-link" required/>
            <span className="popup__input-error avatar-error"></span>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;