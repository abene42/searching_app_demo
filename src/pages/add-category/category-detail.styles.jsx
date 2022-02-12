import styled from 'styled-components';
import {Field} from "formik";

export const CategoryDetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CategoryDetailHeaderContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
`;

export const CategoryDetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  
  p{
    font-size: 20px;
    color: #3E4E5E;
  }
`;

export const CategoryNameContainer = styled.div`
  //background-color: lightpink;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  margin: 10px 5px;
  
  p{
    font-size: 18px;
    color: #3E4E5E;
    font-weight: 400;
  }
`;