import React from 'react';
import {
    CategoryDetailContainer,
    CategoryDetailHeader,
    CategoryDetailHeaderContainer,
    CategoryNameContainer,
} from "./category-detail.styles";
import AddButton from "../../components/add-button/add-button.component";
import {TextFieldRow} from "../../components/custom-text-field/custom-text-field.styles";
import CustomTextField from "../../components/custom-text-field/custom-text-field.component";
import Constants from "../../constants";
import RemoveButton from "../../components/remove-button/remove-button.component";
import CategorySelect from "../../components/category-select/category-select.component";
import {
    hideLoadingAnimation,
    showLoadingAnimation,
    showPageMessage
} from "../../redux/page-message/page-message.actions";
import {connect} from "react-redux";


const DetailContent = ({forPage, categoryList, values, setFieldValue, push, remove, setPageMessage, showLoadingAnimation, hideLoadingAnimation}) => {

    const handleOnChangeCategory = async (event) => {
        console.log(event.target.value)
        showLoadingAnimation()
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

                        let filters = Object.entries(jsonResponse.filters).map(([filterName, remark], index) => {
                            return {
                                name: filterName,
                                value: ''
                            };
                        })
                        setFieldValue('filterFields', filters)
                        // console.log(filters)
                        setFieldValue('category', event.target.value)
                    });
                }
            })
            .catch((async (reason) => {
                setPageMessage({type: 'error', message: 'Error: ' + reason})
            }))
            .finally(() => hideLoadingAnimation())
    }

    return (
        <CategoryDetailContainer>
            <CategoryNameContainer>
                <div>
                    <p>Name</p>
                    <CustomTextField width={300} name={'name'} id={'nameField'}/>
                </div>
                {
                    forPage === 'item' && <div>
                        <p>Category</p>
                        <CategorySelect as='select' control='select' lable="Choose a Category"
                                        name='category'
                                        id={'categorySelectField'}
                                        onChange={(event) => handleOnChangeCategory(event)}>
                            <option key={0} defaultValue value='' hidden>Select Category</option>
                            {
                                categoryList && categoryList?.map((category, index) =>
                                    (<option key={category._id} value={category._id}>{category.name}</option>)
                                )
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
                values.detailFields && values.detailFields.map((detailField, index) => (
                        <TextFieldRow key={index}>
                            <CustomTextField name={`detailFields.${index}.name`}/>
                            <CustomTextField name={`detailFields.${index}.value`}/>
                            <RemoveButton onClick={() => remove(index)}/>
                        </TextFieldRow>
                    )
                )
            }
            <AddButton type={'button'} onClick={() => {
                push({name: '', value: ''});
                console.log(values)
            }}/>
        </CategoryDetailContainer>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setPageMessage: (message) => dispatch(showPageMessage(message)),
    showLoadingAnimation: () => dispatch(showLoadingAnimation()),
    hideLoadingAnimation: () => dispatch(hideLoadingAnimation()),
})

export default connect(null, mapDispatchToProps)(DetailContent);
