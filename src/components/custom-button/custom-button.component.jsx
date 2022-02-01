import React from 'react';
import {CustomButtonContainer} from "./custom-button.styles";

const CustomButton = ({text, backgroundColor, fontColor, ...otherProps})=> (
    <CustomButtonContainer backgroundColor={backgroundColor} fontColor={fontColor} {...otherProps}>
        <p>{text}</p>
    </CustomButtonContainer>
);

export default CustomButton;