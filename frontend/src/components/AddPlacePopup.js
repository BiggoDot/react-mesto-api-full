import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [photoName, setPhotoName] = React.useState('');
    const [photoLink, setPhotoLink] = React.useState('');

    React.useEffect(() => {
        setPhotoName('');
        setPhotoLink('');
    }, [props.isOpen]);

    function handleNameInput(e) {
        setPhotoName(e.target.value)
    }

    function handleLinkInput(e) {
        setPhotoLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateCard({
            name: photoName,
            link: photoLink,
        });
    }

    return (
        <PopupWithForm title={'Новое место'} onClose={props.onClose} isOpen={props.isOpen} onSubmit={handleSubmit}
                       name={'photo'}
                       buttonText={'Создать'}>
            <input type="text" placeholder="Название" className="popup__input popup__input_for_place" id="place"
                   name="photoplace" value={photoName || ""} onChange={handleNameInput} minLength="2" maxLength="30"
                   required/>
            <span className="popup__input-error place-error"></span>
            <input type="url" placeholder="Ссылка на картинку" value={photoLink || ""} onChange={handleLinkInput}
                   className="popup__input popup__input_for_link" id="link" name="photolink" required/>
            <span className="popup__input-error link-error"></span>
        </PopupWithForm>
    );
};

export default AddPlacePopup;