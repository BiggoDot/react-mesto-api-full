import React, {useEffect} from 'react';
import logo from "../images/logo.svg";
import {Link, useLocation} from 'react-router-dom'

function Header(props) {
    let location = useLocation();
    let {email} = props.userEmail || {};
    const [menu, setMenu] = React.useState(false);
    const [widthSize, setWidthSize] = React.useState(window.innerWidth);

    function handleWindowSize() {
        setWidthSize(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize)
        if (widthSize >= 600) {
            setMenu(false);
        }
        return () => window.removeEventListener('resize', handleWindowSize)
    }, [widthSize])

    function handleMenu() {
        setMenu(!menu);
    }

    useEffect(() => {
        setMenu(false);
    }, [location])


    return (<>
        {menu && location.pathname === '/' && <>
            <div className={"burger-menu__container"}>
                <div className="header__email">{email}</div>
                <Link onClick={props.signOut} className="header__logout header__logout_screen_small"
                      to={'/signin'}>Выйти</Link>
            </div>
        </>}
        <header className="header">
            <img src={logo} className="header__logo" alt="Место"/>
            <div className={`header__container ${location.pathname === '/' && "header__container_none"}`}>
                {location.pathname === '/' ?
                    <>
                        <div className="header__email">{email}</div>
                        <Link onClick={props.signOut} className="header__logout" to={'/signin'}>Выйти</Link>
                    </>
                    : location.pathname === '/signin' ?
                        <Link className="header__logout" to={'/signup'}>Регистрация</Link>
                        : location.pathname === '/signup' ?
                            <Link className="header__logout" to={'/signin'}>Войти</Link> : ""}
            </div>
            {location.pathname === '/' && <>
                <button onClick={handleMenu} className={"burger-menu"}>
                    <span className={`burger-menu__line ${menu && "burger-menu__line_active"}`}></span>
                    <span className={`burger-menu__line ${menu && "burger-menu__line_active"}`}></span>
                    <span className={`burger-menu__line ${menu && "burger-menu__line_active"}`}></span>
                </button>
            </>}
        </header>
    </>)
}

export default Header;