import React from 'react';
import EntranceForm from "./EntranceForm";
import {Link} from 'react-router-dom'

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(
            password,
            email
        )

    }

    return (
        <EntranceForm title={'Регистрация'}
                      name={'register'} onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className="popup__input popup__input_for_entrance" id="new_email"
                   name="email" value={email || ''} onChange={handleEmail}
                   minLength="2" maxLength="40" required/>
            <span className="popup__input-error email-error"></span>
            <input type="password" placeholder="Пароль" className="popup__input popup__input_for_entrance"
                   id="new_password"
                   name="password" value={password || ''} onChange={handlePassword} minLength="6"
                   maxLength="200" required/>
            <span className="popup__input-error password-error"></span>
            <button type="submit" className={"popup__save popup__save_for_entrance"}>Зарегистрироваться</button>
            <p className={"popup__text"}>Уже зарегистрированы? <Link className={"popup__link"}
                                                                     to={'/signin'}>Войти</Link></p>
        </EntranceForm>
    );
};

export default Register;