import styled, {css} from 'styled-components';

export const MessageBoxContainer = styled.div`
  height: 50px;
  border-radius: 15px;
  padding:10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 10px #d5d5d5;
  
  p{
    font-size: 14px;
    color: #FFFFFF;
  }
  
  ${(props) => {
    if (props.type === 'success') {
        return css`
              background-color: #329E53;
            `;
    } else if (props.type === 'error') {
        return css` 
              background-color: #fa0000;
            `;
    }
}};
  position: absolute;
  bottom: 15px;
  z-index: 100;
  left: 45%;
`;