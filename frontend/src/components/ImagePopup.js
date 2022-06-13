import React from 'react';

function ImagePopup(props) {
    return (<div className={`popup popup_for_image ${props.card.name && 'popup_opened'}`}>
        <div className="popup__container popup__container_for_image">
            <button type="button" className="popup__close popup__close_for_image" onClick={props.onClose}></button>
            <img className="popup__image" alt={props.card.name} src={props.card.link}/>
            <h2 className="popup__title popup__title_for_image">{props.card.name}</h2>
        </div>
    </div>)
}

export default ImagePopup;