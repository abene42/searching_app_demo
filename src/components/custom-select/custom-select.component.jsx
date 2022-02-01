import React from 'react';
import {ChevronIcon, CustomSelectButton, CustomSelectContainer} from "./custom-select.styles";
import chevron from '../../assets/icons/chevron_down.svg';

const CustomSelect = ({children}) => (
    <CustomSelectContainer>
        <CustomSelectButton>
            {children}
        </CustomSelectButton>
        <ChevronIcon src={chevron}/>
    </CustomSelectContainer>
)

export default CustomSelect;