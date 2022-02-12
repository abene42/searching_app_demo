import styled from 'styled-components';
import {Field} from "formik";

export const CategorySelectContainer = styled(Field)`
  border-radius: 3px;
  width: 230px;
  font-size: 18px;
  font-weight: 200;
  color: #3E4E5E;
  text-align: start;
  outline: solid 1px rgba(62,78,94,0.62);
  border:none;
  padding: 5px 5px 5px 10px;
  text-transform: capitalize;
  
  option{
    text-transform: capitalize;
  }
`;