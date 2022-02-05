import React, {useState} from 'react';
import {HeaderContainer, HeaderLink, HeaderLinksContainer, Logo, LogoContainer} from "./header.styles";
import logo from '../../assets/icons/logo.svg';
import {useLocation} from "react-router-dom";

const Header = () => {
    return (
        <HeaderContainer>
            <LogoContainer>
                <Logo alt={'demo'} src={logo}/>
            </LogoContainer>
            <HeaderLinksContainer>
                <HeaderLink to={'/'}>
                    <p>Home</p>
                </HeaderLink>
                <HeaderLink to={'/item'}>
                    <p>Item</p>
                </HeaderLink>
                <HeaderLink to={'/category'}>
                    <p>Category</p>
                </HeaderLink>
            </HeaderLinksContainer>
        </HeaderContainer>
    );
}

export default Header;