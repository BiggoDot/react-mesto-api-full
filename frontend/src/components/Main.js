import React from 'react';
import Card from "./Card.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (<main className="main">
        <section className="profile">
            <div className="profile__container">
                <button className="profile__avatar-button" aria-label="редактировать аватар" type="button"
                        onClick={props.onEditAvatar}>
                    <img alt="аватар" className="profile__avatar" src={currentUser.avatar}/>
                </button>
                <div className="profile__info-edit">
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                    <button className="profile__edit" aria-label="редактировать профиль" type="button"
                            onClick={props.onEditProfile}></button>
                </div>
            </div>
            <button aria-label="Добавить фото" type="button" className="profile__photo-button"
                    onClick={props.onAddPlace}></button>
        </section>
        <section className="photo">
            <ul className="photo__grid">
                {props.cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.handleCardLike}
                          onCardDelete={props.handleCardDelete}/>
                ))}
            </ul>
        </section>
    </main>)
}

export default Main;