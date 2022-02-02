import React, {useState} from 'react';
import {CategoryDetailContainer, CategoryDetailHeader, CategoryDetailHeaderContainer} from "./category-detail.styles";
import AddButton from "../../components/add-button/add-button.component";
import {TextFieldRow} from "../../components/custom-text-field/custom-text-field.styles";
import CustomTextField from "../../components/custom-text-field/custom-text-field.component";


const DetailContent = () => {
    const [rowCount, setRowCount] = useState(1);

    const rows = [];

    for (let i = 0; i < rowCount; i++) {
        rows.push(
            <TextFieldRow key={i}>
                <CustomTextField type={'text'} name={'detailField['+i+']'}/>
                <CustomTextField type={'text'} name={'detailValue['+i+']'}/>
            </TextFieldRow>
        );
    }

    const handleAddRow = () => {
        setRowCount(rowCount + 1)
    }

    return (
        <CategoryDetailContainer>
            <CategoryDetailHeaderContainer>
                <CategoryDetailHeader><p>Field</p></CategoryDetailHeader>
                <CategoryDetailHeader><p>Value</p></CategoryDetailHeader>
            </CategoryDetailHeaderContainer>
            {
                rows.map((row) => row)
            }
            <AddButton type={'button'} onClick={() => handleAddRow()}/>
        </CategoryDetailContainer>
    );
};

export default DetailContent;
