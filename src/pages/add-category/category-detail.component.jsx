import React, {useState} from 'react';
import {
    CategoryDetailContainer,
    CategoryDetailHeader,
    CategoryDetailHeaderContainer,
    CategoryNameContainer, CategorySelect
} from "./category-detail.styles";
import AddButton from "../../components/add-button/add-button.component";
import {TextFieldRow} from "../../components/custom-text-field/custom-text-field.styles";
import CustomTextField from "../../components/custom-text-field/custom-text-field.component";
import {FieldArray} from "formik";
import CustomSelect from "../../components/custom-select/custom-select.component";
import Constants from "../../constants";
import {showLoadingAnimation} from "../../redux/page-message/page-message.actions";


const DetailContent = ({rowCount, setRowCount,forPage, categoryList,setFilterInputList,values,setValues}) => {

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
    
    const handleOnChangeCategory = async (event) => {
        await fetch(Constants.API_URL + '/item/get/category', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: event.target.value})
        })
            .then(async (response) => {
                if (response.status === 200) {
                    response.json().then(async (jsonResponse) => {
                        let filters = [];
                        Object.entries(jsonResponse.filters).map(([filterName,remark],index)=>{
                            filters[index] = filterName
                        })
                        setFilterInputList(filters)
                        setValues({...values, category:jsonResponse.name,filterName:filters,filterValue:[]})
                    });
                }
            })
            .catch((async (reason) => {
                // setPageMessage({type: 'error', message: 'Error: ' + reason})
            }))
    }

    return (
        <CategoryDetailContainer>
            <CategoryNameContainer>
                <div>
                <p>Name</p>
                <CustomTextField width={300} type={'text'} name={'name'} id={'nameField'}/>
                </div>
                {
                    forPage === 'item' && <div>
                        <p>Category</p>
                        <CategorySelect component="select" name={'category'} id={'categorySelectField'} onChange={handleOnChangeCategory}>
                            <option key={0} value={''} defaultValue hidden>Select Category</option>
                            {
                                categoryList?.map((category,index) => <option key={index +1 } value={category._id}>{category.name}</option>)
                            }
                        </CategorySelect>
                    </div>
                }
            </CategoryNameContainer>
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
