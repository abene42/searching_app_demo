import React, {useState} from 'react';
import Header from "../../components/header/header.component";
import {
    AddPageContainer,
    FilterContainerBody,
    FilterNameColumn,
    FiltersContainer,
    HorizontalDivider,
    LeftSection,
    LeftSectionContent,
    PageFold,
    RemarkColumn,
    RemarkWithRemoveButtonRow,
    RightSection,
    SaveAndCancelSection
} from "./add-category.page.styles";
import {PageTitle} from "../../components/page-title/page-title.styles";
import PandaCard from "../../components/panda-card/panda-card.component";
import DetailContent from "./category-detail.component";
import AddFilterButton from "../../components/add-filter-button/add-filter-button.component";
import CustomScroll from "react-custom-scroll";
import CustomTextField from "../../components/custom-text-field/custom-text-field.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import '/node_modules/react-custom-scroll/dist/customScroll.css';
import {FieldArray, Form, Formik} from "formik";
import MessageBox from "../../components/message-box/message-box.component";
import Constants from "../../constants";
import {createStructuredSelector} from "reselect";
import {selectMessage} from "../../redux/page-message/page-message.selectors";
import {connect} from "react-redux";
import {
    hideLoadingAnimation,
    showLoadingAnimation,
    showPageMessage
} from "../../redux/page-message/page-message.actions";
import RemoveButton from "../../components/remove-button/remove-button.component";

const AddCategoryPage = ({pageMessage, setPageMessage, showLoadingAnimation, hideLoadingAnimation}) => {

    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
        console.log(values)
        showLoadingAnimation();
        await fetch(Constants.API_URL + '/category/add', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
            .then(async (response) => {
                if (response.status === 200) {
                    response.json().then(async (jsonResponse) => console.log(jsonResponse))
                    setPageMessage({type: 'success', message: 'Successfully created a category'});
                    resetForm()
                } else if (response.status === 422) {
                    response.json().then(async (jsonResponse) => {
                        setPageMessage({type: 'error', message: Object.entries(jsonResponse.errors)[0][1][0]});
                    });
                }
            })
            .catch((reason => setPageMessage({type: 'error', message: 'Error: ' + reason})))
            .finally(() => hideLoadingAnimation())
    }

    return (
        <Formik
            initialValues={{name: '', detailFields: [{name: '', value: ''}], filterFields: [{name: '', remark: ''}]}}
            onSubmit={handleSubmit}
        >
            {({isSubmitting, values, resetForm, setFieldValue}) => (
                <Form>
                    <AddPageContainer>
                        <LeftSection>
                            <Header/>
                            <LeftSectionContent>
                                <PageTitle>
                                    <p>Add Category</p>
                                </PageTitle>
                                <FieldArray name={'detailFields'}>
                                    {
                                        ({push, remove}) => (
                                            <PandaCard titleElement={'Category Detail'}
                                                       content={<DetailContent {...{
                                                           push,
                                                           remove,
                                                           values,
                                                       }}/>}
                                            />
                                        )
                                    }
                                </FieldArray>
                            </LeftSectionContent>
                        </LeftSection>
                        <RightSection>
                            <PageFold>
                                <p>Add Filters</p>
                            </PageFold>
                            <CustomScroll>
                                <FiltersContainer>
                                    <FieldArray name={'filterFields'}>
                                        {
                                            ({push, remove}) => (
                                                <>
                                                    <FilterContainerBody>
                                                        <FilterNameColumn>
                                                            <p>Filter Name</p>
                                                            {
                                                                // initialFilterNameRows.map((row) => row)
                                                                values.filterFields && values.filterFields.map((filterField, index) => (
                                                                    <CustomTextField width={'200px'} key={index}
                                                                                     name={`filterFields.${index}.name`}/>
                                                                ))
                                                            }
                                                        </FilterNameColumn>
                                                        <RemarkColumn>
                                                            <p>Remark</p>
                                                            {
                                                                // initialRemarkRows.map((row) => row)
                                                                values.filterFields && values.filterFields.map((filterField, index) => (
                                                                    <RemarkWithRemoveButtonRow key={index}>
                                                                        <CustomTextField type={'text'} width={'400px'}
                                                                                         name={`filterFields.${index}.remark`}/>
                                                                        <RemoveButton onClick={() => remove(index)}/>
                                                                    </RemarkWithRemoveButtonRow>
                                                                ))
                                                            }
                                                        </RemarkColumn>
                                                    </FilterContainerBody>
                                                    <AddFilterButton
                                                        onClick={() => push({name: '', remark: ''})}/>
                                                </>
                                            )
                                        }
                                    </FieldArray>
                                </FiltersContainer>
                            </CustomScroll>
                            <HorizontalDivider/>
                            <SaveAndCancelSection>

                                <CustomButton disabled={isSubmitting} type='button'
                                              onClick={() => resetForm()}
                                              text={'Clear'}
                                              backgroundColor={'#F2F2F2'}
                                              fontColor={'#3E4E5E'}/>
                                <CustomButton disabled={isSubmitting} type='submit' text={'Save'}
                                              backgroundColor={'#0884FF'} fontColor={'#FFFFFF'}/>
                            </SaveAndCancelSection>
                        </RightSection>
                        <MessageBox/>
                    </AddPageContainer>
                </Form>
            )}
        </Formik>
    );
}

const mapStateToProps = createStructuredSelector({
    pageMessage: selectMessage
})

const mapDispatchToProps = (dispatch) => ({
    setPageMessage: (message) => dispatch(showPageMessage(message)),
    showLoadingAnimation: () => dispatch(showLoadingAnimation()),
    hideLoadingAnimation: () => dispatch(hideLoadingAnimation())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryPage);