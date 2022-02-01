import React from 'react';
import {AddFilterButtonContainer} from "./add-filter-button.styles";
import AddButton from "../add-button/add-button.component";

const AddFilterButton = ({...otherProps}) => (
    <AddFilterButtonContainer {...otherProps}>
        <p>Add Filter</p>
        <AddButton color={'white_blue'}/>
    </AddFilterButtonContainer>
);

export default AddFilterButton;