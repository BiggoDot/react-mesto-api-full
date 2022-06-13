import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`photo__like ${isLiked && 'photo__like_active'}`);
    const cardDeleteButtonClassName = (`photo__delete ${!isOwn && 'photo__delete_hidden'}`);

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="photo__item">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img className="photo__mesto" alt={props.card.name} src={props.card.link} onClick={handleClick}/>
            <div className="photo__container">
                <h2 className="photo__description">{props.card.name}</h2>
                <div className="photo__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <div className="photo__like-count">{props.card.likes.length}</div>
                </div>
            </div>
        </li>
    );
};

export default Card;