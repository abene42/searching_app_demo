import React, {useEffect, useState} from 'react';
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
} from "../add-category/add-category.page.styles";
import {Form, Formik} from "formik";
import Header from "../../components/header/header.component";
import {PageTitle} from "../../components/page-title/page-title.styles";
import PandaCard from "../../components/panda-card/panda-card.component";
import CustomScroll from "react-custom-scroll";
import DetailContent from "../add-category/category-detail.component";
import CustomTextField from "../../components/custom-text-field/custom-text-field.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import MessageBox from "../../components/message-box/message-box.component";
import Constants from "../../constants";
import {connect} from "react-redux";
import {
    hideLoadingAnimation,
    showLoadingAnimation,
    showPageMessage
} from "../../redux/page-message/page-message.actions";
import NoDataText from "../../components/no-data/no-data.component";

const AddItemPage = ({showLoadingAnimation, hideLoadingAnimation, setPageMessage}) => {

    //States
    const [filterRowCount, setFilterRowCount] = useState(1);
    const [filterInputList, setFilterInputList] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [categoryList, setCategoriesList] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch(Constants.API_URL + '/item/get/categories', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });
            const jsonResponse = await response.json();
            setCategoriesList(jsonResponse);
        }

        getCategories();
    }, []);


    const handleRemoveClick = (index) => {
        // console.log('remove')
        const list = [...filterInputList];
        list.splice(index, 1);
        setFilterInputList(list);
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{detailField: [''], detailValue: [''], category: ''}}
            onSubmit={async (values, {setSubmitting, resetForm,setValues}) => {
                console.log(values)
                showLoadingAnimation();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await fetch(Constants.API_URL + '/item/add', {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                    .then(async (response) => {
                        if (response.status === 200) {
                            setPageMessage({type: 'success', message: 'Successfully created an Item'})
                            setFilterInputList([]);
                            resetForm();
                            setValues({})
                        } else if (response.status === 422) {
                            response.json().then(async (jsonResponse) => {
                                setPageMessage({
                                    type: 'error',
                                    message: 'Validation: ' + Object.entries(jsonResponse.errors)[0][1][0]
                                });
                            });
                        }
                    })
                    .catch((async (reason) => {
                        setPageMessage({type: 'error', message: 'Error: ' + reason})
                    }))
                    .finally(() => hideLoadingAnimation())
            }}
        >
            {({isSubmitting, values, setValues, setFieldValue}) => (
                <Form>
                    <AddPageContainer>
                        <LeftSection>
                            <Header/>
                            <LeftSectionContent>
                                <PageTitle>
                                    <p>Add Item</p>
                                </PageTitle>
                                <PandaCard titleElement={'Item Detail'}
                                           content={<DetailContent values={values} setValues={setValues}
                                                                   setFilterInputList={setFilterInputList}
                                                                   categoryList={categoryList} forPage={'item'}
                                                                   rowCount={rowCount}
                                                                   setRowCount={setRowCount}/>}/>
                            </LeftSectionContent>
                        </LeftSection>
                        <RightSection>
                            <PageFold>
                                <p>Add Filters</p>
                            </PageFold>
                            {
                                filterInputList.length > 0
                                    ? <div>
                                        <CustomScroll>
                                            <FiltersContainer>
                                                <FilterContainerBody>
                                                    <FilterNameColumn>
                                                        <p>Filter Name</p>
                                                        {
                                                            filterInputList.map((input, index) => {
                                                                let filterName = input.toUpperCase()
                                                                return (
                                                                    <CustomTextField name={`filterName[${index}]`}
                                                                                     type={'text'} key={index}
                                                                                     value={filterName} disabled/>
                                                                )
                                                            })
                                                        }
                                                    </FilterNameColumn>
                                                    <RemarkColumn>
                                                        <p>Value</p>
                                                        {/*{*/}
                                                        {/*    initialValueRows.map((row) => row)*/}
                                                        {/*}*/}
                                                        {
                                                            filterInputList.map((input, index) => {
                                                                return (
                                                                    <RemarkWithRemoveButtonRow key={index}>
                                                                        <CustomTextField type={'text'}
                                                                                         name={`filterValue[${index}]`}/>
                                                                    </RemarkWithRemoveButtonRow>
                                                                )
                                                            })
                                                        }
                                                    </RemarkColumn>
                                                </FilterContainerBody>
                                                {/*<AddFilterButton onClick={() => setFilterInputList([...filterInputList, {*/}
                                                {/*    filterName: [''],*/}
                                                {/*    filterValue: ['']*/}
                                                {/*}])}/>*/}
                                            </FiltersContainer>
                                        </CustomScroll>
                                        <HorizontalDivider/>
                                        <SaveAndCancelSection>

                                            <CustomButton disabled={isSubmitting} type='submit' text={'Save'}
                                                          backgroundColor={'#0884FF'} fontColor={'#FFFFFF'}/>
                                            {/*<SaveButton/>*/}
                                        </SaveAndCancelSection>
                                    </div>
                                    : <NoDataText text={'Choose a category and the filter will appear here'}/>
                            }
                        </RightSection>
                        <MessageBox/>
                    </AddPageContainer>
                </Form>
            )}
        </Formik>
    )
};

const mapDispatchToProps = (dispatch) => ({
    setPageMessage: (message) => dispatch(showPageMessage(message)),
    showLoadingAnimation: () => dispatch(showLoadingAnimation()),
    hideLoadingAnimation: () => dispatch(hideLoadingAnimation()),
})

export default connect(null, mapDispatchToProps)(AddItemPage);