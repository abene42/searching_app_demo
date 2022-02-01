import styled from 'styled-components';
import {Field} from "formik";

export const TextFieldContainer = styled(Field)`
  border-radius: 3px;
  width: ${props => props.width ?? `150px`};
  font-size: 18px;
  font-weight: 200;
  color: #3E4E5E;
  text-align: start;
  outline: solid 1px rgba(62,78,94,0.62);
  border:none;
  padding: 5px 5px 5px 10px;
`;

export const TextFieldRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7.5px 0;
`;