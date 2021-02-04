import React from 'react';
import s from './Header.module.css'

const Header = () => {
    return (
        <header className={s.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Unofficial_JavaScript_logo.svg/480px-Unofficial_JavaScript_logo.svg.png"
                alt="image"/>
        </header>
    )
}

export default Header;
