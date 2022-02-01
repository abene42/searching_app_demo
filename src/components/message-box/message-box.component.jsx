import React from 'react';
import {MessageBoxContainer} from "./message-box.styles";

const MessageBox = ({message, type}) => (
    <MessageBoxContainer {...type}>
        <p>{message}</p>
    </MessageBoxContainer>
);

export default MessageBox;