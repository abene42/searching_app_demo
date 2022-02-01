import React from 'react';
import {HeaderContainer, HeaderLink, HeaderLinksContainer, Logo, LogoContainer} from "./header.styles";
import logo from '../../assets/icons/logo.svg';

const Header = () => (
    <HeaderContainer>
        <LogoContainer>
            <Logo alt={'demo'} src={logo}/>
        </LogoContainer>
        <HeaderLinksContainer>
            <HeaderLink to={'/'}>
                <p>Home</p>
            </HeaderLink>
            <HeaderLink to={'/'}>
                <p>Item</p>
            </HeaderLink>
            <HeaderLink to={'/'} active>
                <p>Category</p>
            </HeaderLink>
        </HeaderLinksContainer>
    </HeaderContainer>
)

export default Header;