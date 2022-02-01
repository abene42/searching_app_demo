import styled from 'styled-components';

export const CustomButtonContainer = styled.button`
  outline: none;
  text-decoration: none;
  border: none;
  //display: inline-block;
  background-color: ${props => props.backgroundColor ?? '#F2F2F2'};
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  padding: 10px 24px;
  height: 45px;
  cursor:${props => props.disabled? 'not-allowed': 'pointer'};;
  
  p{
    font-size: 18px;
    color: ${props => props.fontColor ?? '#3E4E5E'};
    font-weight: 200;
  }
  
  
`;