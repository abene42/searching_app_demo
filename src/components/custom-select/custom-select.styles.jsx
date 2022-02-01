import styled from "styled-components";

export const CustomSelectContainer = styled.div`
  display: flex;
  position: relative;
`;

export const CustomSelectButton = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  height: 80px;
  width: 410px;
  outline: none;
  background: #3E4E5E;
  border-radius: 25px 25px 0 0;
  color: #FFFFFF;
  font-size: 20px;
  text-align: center;
  cursor:pointer;
  position: relative;
    
  option {
    font-size: 20px;
  }
  
  option:checked{
    background-color: #FFFFFF;
    color: #6a6a6a;
  }
    
  option:not(:checked) {
    background: #F2F2F2;
    color: #3E4E5E;
  }
`;

export const ChevronIcon = styled.img`
  width: 20px;
  height: 30px;
  position: absolute;
  right: 70px;
  bottom: 25px;
`;