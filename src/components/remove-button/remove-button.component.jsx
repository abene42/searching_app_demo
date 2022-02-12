import React from 'react';
import {RemoveButtonContainer} from "./remove-button.styles";

const RemoveButton = ({...props}) => (
    <RemoveButtonContainer {...props}>
        <p>-</p>
    </RemoveButtonContainer>
);

export default RemoveButton;