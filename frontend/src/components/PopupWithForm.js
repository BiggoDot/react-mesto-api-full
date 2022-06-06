import React from 'react';

function PopupWithForm(props) {
    const name = props.name;
    const title = props.title;
    const buttonText = props.buttonText;
    const children = props.children;
    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" className="popup__close popup__close_for_profile"
                        onClick={props.onClose}></button>
                <h2 className={`popup__title popup__title_for${name}`}>{title}</h2>
                <form className={`popup__form popup__form_for_${name}`} name={name} onSubmit={props.onSubmit}>
                    {children}
                    <button type="submit" className={`popup__save popup__save_for_${name}`}>{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;