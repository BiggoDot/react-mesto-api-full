import React from 'react';
import EntranceForm from "./EntranceForm";

function Login(props) {
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
        props.onLogin(
            password,
            email
        )
    }

    return (
        <EntranceForm title={'Вход'}
                      name={'login'} onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className="popup__input popup__input_for_entrance" id="email"
                   name="email" value={email || ''} onChange={handleEmail}
                   minLength="2" maxLength="40" required/>
            <span className="popup__input-error email-error"></span>
            <input type="password" placeholder="Пароль" className="popup__input popup__input_for_entrance"
                   id="password"
                   name="password" value={password || ''} onChange={handlePassword} minLength="6"
                   maxLength="200" required/>
            <span className="popup__input-error password-error"></span>
            <button type="submit" className={"popup__save popup__save_for_entrance"}>Войти</button>
        </EntranceForm>
    );
};

export default Login;