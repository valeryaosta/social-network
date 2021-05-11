import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {HeaderContainerPropsType} from "./HeaderContainer";


const Header = (props: HeaderContainerPropsType) => {
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Unofficial_JavaScript_logo.svg/480px-Unofficial_JavaScript_logo.svg.png"
                alt="ava"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div> {props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}

export default Header;
