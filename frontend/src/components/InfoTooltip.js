import React from 'react';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" className="popup__close popup__close_for_profile"
                        onClick={props.onClose}></button>
                <img className={"popup__img"} src={props.img}/>
                <h2 className={`popup__title popup__title_for_${props.name}`}>{props.text}</h2>
            </div>
        </div>
    );
};

export default InfoTooltip;