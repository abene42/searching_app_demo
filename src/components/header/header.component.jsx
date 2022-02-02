import React, {useState} from 'react';
import {HeaderContainer, HeaderLink, HeaderLinksContainer, Logo, LogoContainer} from "./header.styles";
import logo from '../../assets/icons/logo.svg';

const Header = () => {

    const [activeButtonIndex, setActiveButtonIndex] = useState(1);

    const handleButtonIndexClick = (index) =>  setActiveButtonIndex(index);

    return (
        <HeaderContainer>
            <LogoContainer>
                <Logo alt={'demo'} src={logo}/>
            </LogoContainer>
            <HeaderLinksContainer>
                <HeaderLink active={activeButtonIndex === 0} onClick={() => handleButtonIndexClick(0)} to={'/'}>
                    <p>Home</p>
                </HeaderLink>
                <HeaderLink active={activeButtonIndex === 1} onClick={() => handleButtonIndexClick(1)} to={'/item'}>
                    <p>Item</p>
                </HeaderLink>
                <HeaderLink active={activeButtonIndex === 2} onClick={() => handleButtonIndexClick(2)} to={'/category'}>
                    <p>Category</p>
                </HeaderLink>
            </HeaderLinksContainer>
        </HeaderContainer>
    );
}

export default Header;