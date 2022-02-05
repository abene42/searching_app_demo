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
import RemoveButton from "../../components/remove-button/remove-button.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import '/node_modules/react-custom-scroll/dist/customScroll.css';
import {Form, Formik} from "formik";
import Constants from "../../constants";
import MessageBox from "../../components/message-box/message-box.component";

const AddCategoryPage = () => {

    const [filterRowCount, setFilterRowCount] = useState(1);
    const [pageMessage, setPageMessage] = useState({});

    const initialFilterNameRows = [];
    const initialRemarkRows = [];

    for (let i = 0; i < filterRowCount; i++) {
        initialFilterNameRows.push(
            <CustomTextField type={'text'} key={i} name={'filterName[' + i + ']'}/>
        );

        initialRemarkRows.push(
            <RemarkWithRemoveButtonRow key={i}>
                <CustomTextField type={'text'} width={'680px'} name={'filterRemark[' + i + ']'}/>
                {/*<RemoveButton/>*/}
            </RemarkWithRemoveButtonRow>
        );
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/test', {
            method: "POST",
        })
            .then((response) => response.json())
            .then((jsonResponse) => console.log(jsonResponse.text))
            .catch((reason => console.error(reason)))
    }

    return (
        <Formik
            initialValues={{detailField: ['Name']}}
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
                await fetch(Constants.API_URL + '/category/add', {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                    .then(async (response) => {
                        if(response.status === 200){
                            console.log(response.body)
                            setPageMessage({type:'success',message:'Successfully created a category'})
                            resetForm();
                            await new Promise(resolve => setTimeout(resolve, 3000));
                            setPageMessage({})
                        }
                    })
                    .catch((reason => console.error(reason)))
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <AddPageContainer>
                        <LeftSection>
                            <Header/>
                            <LeftSectionContent>
                                <PageTitle>
                                    <p>Add Category</p>
                                </PageTitle>
                                <PandaCard titleElement={'Category Detail'} content={<DetailContent/>}/>
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
                                            <p>Remark</p>
                                            {
                                                initialRemarkRows.map((row) => row)
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
    );
}

export default AddCategoryPage;