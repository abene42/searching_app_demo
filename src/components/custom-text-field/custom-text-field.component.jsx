import React from 'react';
import {TextFieldContainer} from "./custom-text-field.styles";

const CustomTextField = ({width, ...otherProps}) => (
  <TextFieldContainer width={width} {...otherProps}/>
);

export default CustomTextField;