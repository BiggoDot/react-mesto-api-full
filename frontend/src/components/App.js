import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import React from "react";
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom';
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import {register, authorize, checkToken} from '../utils/authApi'
import fail from '../images/fail.svg'
import success from '../images/success.svg'

function App(props) {
    const navigate = useNavigate();
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [infoToolOpen, setInfoToolOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [notification, setNotification] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState(null);

    React.useEffect(() => {
        handleCheckToken();
        if (loggedIn) {
            navigate('/');
            Promise.all([api.getInitialCards(), api.getProfile()])
                .then(([cardInfo, userInfo]) => {
                    setCards(cardInfo);
                    setCurrentUser(userInfo);
                })
                .catch((err) => console.log(err))
        }
    }, [loggedIn])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id))
            })
            .catch((err) => console.log(err))
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setInfoToolOpen(false);
        setSelectedCard({});
    }

    function handleUpdateUser(user) {
        api.editProfile(user.name, user.about)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(user) {
        api.setAvatar(user.avatar)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateCard(user) {
        api.newCard(user.name, user.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleRegisterSubmit(password, email) {
        register(password, email)
            .then((res) => {
                if (res) {
                    setNotification(true);
                    navigate('/signin');
                }
            })
            .catch(() => setNotification(false))
            .finally(() => setInfoToolOpen(true))
    }

    function handleLoginSubmit(password, email) {
        authorize(password, email)
            .then((res) => {
                if (res) {
                    localStorage.setItem('jwt', res.token);
                    setLoggedIn(true);
                    navigate('/');
                }
            })
            .catch(() => {
                setNotification(false);
                setInfoToolOpen(true);
            })
    }

    function handleCheckToken() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setUserInfo({email: res.data.email});
                        setLoggedIn(true);
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    function handleLogout() {
        localStorage.removeItem('jwt');
        navigate('/signin');
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header userEmail={userInfo} signOut={handleLogout}/>
                <Routes>
                    <Route element={<ProtectedRoute loggedIn={loggedIn}
                    ></ProtectedRoute>}>
                        <Route exact path={'/'} element={<>
                            <Main onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick}
                                  onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards}
                                  handleCardLike={handleCardLike}
                                  handleCardDelete={handleCardDelete}/>
                            <Footer/>
                            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                              onUpdateUser={handleUpdateUser}/>
                            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                           onUpdateCard={handleUpdateCard}/>
                            <PopupWithForm title={'Вы уверены?'} name={'delete'} buttonText={'Да'}/>
                            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                             onUpdateAvatar={handleUpdateAvatar}/>
                            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                        </>}></Route>
                    </Route>
                    <Route path='/signup' element={<><Register onRegister={handleRegisterSubmit}/> <InfoTooltip
                        onClose={closeAllPopups} isOpen={infoToolOpen} name={'info-tool'}
                        img={notification ? success : fail} text={notification ?
                        'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}/></>}></Route>
                    <Route path='/signin' element={<><Login onLogin={handleLoginSubmit}/>
                        <InfoTooltip
                            onClose={closeAllPopups} isOpen={infoToolOpen} name={'info-tool'}
                            img={notification ? success : fail} text={notification ?
                            'Вы успешно зарегистрировались!'
                            : 'Что-то пошло не так! Попробуйте ещё раз.'}/></>}></Route>
                    <Route path={'*'} element={<Navigate replace to={loggedIn ? '/' : '/signin'}/>}/>
                </Routes>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
