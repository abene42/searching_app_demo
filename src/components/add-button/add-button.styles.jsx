import styled, {css} from 'styled-components';

export const AddButtonContainer = styled.button`
  border: none;
  outline: none;
  width: 25px;
  height: 25px;
  border-radius: 50px;
  background-color: #0884FF;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor:pointer;
  margin: 5px 0;
  
  ${props => {
      if(props.color === 'white_blue'){
          return css`
              background-color: #FFFFFF;
              color: #0884FF;
              svg{
                  fill: black;
                  stroke: black;
              }
          `;
      }
}};
`;