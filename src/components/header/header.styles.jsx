import styled, {css} from 'styled-components';
import {Link} from "react-router-dom";

export const HeaderContainer = styled.div`
  //background-color: cadetblue;
  height: 80px;
  width: 100%;
  display: flex;  
  flex-direction: row;
  align-items: center;
`;

export const LogoContainer = styled.div`
  height: 100%;
  width: 122px;
`;

export const Logo = styled.img`
  height: 100%;
  width: 100%;
`;

export const HeaderLinksContainer = styled.div`
  //background-color: darkseagreen;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const HeaderLink = styled(Link)`
  height: 80px;
  width: 148px;
  margin: 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border-radius: 0 0 10px 10px;
  ${props => {
    if(props.active){
        return css`
            background-color: #3E4E5E;
            p{
              color: #FFFFFF;
              font-size: 20px;
              font-weight: 500;
            }
        `;
    }else{
        return css`
            p{
              color: #3E4E5E;
              font-size: 20px;
              font-weight: 600;
            }
            
            &:hover{
              background-color: #F1F1F1;
              color: #3E4E5E;
            }
        `;
    }
  }}: '';
`;

