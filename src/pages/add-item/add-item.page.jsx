import React, {useState} from 'react';
import {
    AddPageContainer,
    FilterContainerBody,
    FilterNameColumn,
    FiltersContainer, HorizontalDivider,
    LeftSection,
    LeftSectionContent,
    PageFold,
    RemarkColumn, RemarkWithRemoveButtonRow,
    RightSection, SaveAndCancelSection
} from "../add-category/add-category.page.styles";
import {Form, Formik} from "formik";
import Header from "../../components/header/header.component";
import {PageTitle} from "../../components/page-title/page-title.styles";
import PandaCard from "../../components/panda-card/panda-card.component";
import CustomScroll from "react-custom-scroll";
import DetailContent from "../add-category/category-detail.component";
import CustomTextField from "../../components/custom-text-field/custom-text-field.component";
import RemoveButton from "../../components/remove-button/remove-button.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import MessageBox from "../../components/message-box/message-box.component";
import AddFilterButton from "../../components/add-filter-button/add-filter-button.component";
import Constants from "../../constants";

const AddItemPage = () => {

    //States
    const [filterRowCount, setFilterRowCount] = useState(1);
    const [pageMessage, setPageMessage] = useState({});

    const initialFilterNameRows = [];
    const initialValueRows = [];

    for (let i = 0; i < filterRowCount; i++) {
        initialFilterNameRows.push(
            <CustomTextField type={'text'} key={i} name={'filterName[' + i + ']'}/>
        );

        initialValueRows.push(
            <RemarkWithRemoveButtonRow key={i}>
                <CustomTextField type={'text'} width={'300px'} name={'filterValue[' + i + ']'}/>
                {/*<RemoveButton/>*/}
            </RemarkWithRemoveButtonRow>
        );
    }

    return (
        <Formik
            initialValues={{}}
            validate={values => {
                const errors = {};
                // if (!values.email) {
                //     errors.email = 'Required';
                // } else if (
                //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                // ) {
                //     errors.email = 'Invalid email address';
                // }
                return errors;
            }}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
                // console.log(values)
                await fetch(Constants.API_URL + '/item/add', {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                    .then(async (response) => {
                        if(response.status === 200){
                            setPageMessage({type:'success',message:'Successfully created an Item'})
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            setPageMessage({})
                        }
                    })
                    .catch((async (reason) => {
                        setPageMessage({type:'error',message:'Error: '+reason})
                        // await new Promise(resolve => setTimeout(resolve, 5000));
                        // setPageMessage({})
                    }))
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <AddPageContainer>
                        <LeftSection>
                            <Header/>
                            <LeftSectionContent>
                                <PageTitle>
                                    <p>Add Item</p>
                                </PageTitle>
                                <PandaCard titleElement={'Item Detail'} content={<DetailContent/>}/>
                            </LeftSectionContent>
                        </LeftSection>
                        <RightSection>
                            <PageFold>
                                <p>Add Filters</p>
                            </PageFold>
                            <CustomScroll>
                                <FiltersContainer>
                                    <FilterContainerBody>
                                        <FilterNameColumn>
                                            <p>Filter Name</p>
                                            {
                                                initialFilterNameRows.map((row) => row)
                                            }
                                        </FilterNameColumn>
                                        <RemarkColumn>
                                            <p>Value</p>
                                            {
                                                initialValueRows.map((row) => row)
                                            }
                                        </RemarkColumn>
                                    </FilterContainerBody>
                                    <AddFilterButton onClick={() => setFilterRowCount(filterRowCount + 1)}/>
                                </FiltersContainer>
                            </CustomScroll>
                            <HorizontalDivider/>
                            <SaveAndCancelSection>
                                <CustomButton text={'Clear'} type='button'/>
                                <CustomButton disabled={isSubmitting} type='submit' text={'Save'}
                                              backgroundColor={'#0884FF'} fontColor={'#FFFFFF'}/>
                                {/*<SaveButton/>*/}
                            </SaveAndCancelSection>
                        </RightSection>
                        {
                            Object.keys(pageMessage).length > 0 ? <MessageBox message={pageMessage.message} type={pageMessage.type}/> : ''
                        }
                    </AddPageContainer>
                </Form>
            )}
        </Formik>
    )
};

export default AddItemPage;