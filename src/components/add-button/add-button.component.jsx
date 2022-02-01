import React from 'react';
import plusIcon from '../../assets/icons/plus_icon.svg';
import {AddPageContainer} from "../../pages/add-category/add-category.page.styles";
import {AddButtonContainer} from "./add-button.styles";

const AddButton = ({color, ...otherProps}) => (
    <AddButtonContainer color={color} {...otherProps}>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11">
            <g id="plus_icon" transform="translate(0.5 0.5)">
                <path id="Path_3" data-name="Path 3" d="M18,7.5v10" transform="translate(-13 -7.5)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                <path id="Path_4" data-name="Path 4" d="M7.5,18h10" transform="translate(-7.5 -13)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
            </g>
        </svg>

    </AddButtonContainer>
)

export default AddButton;