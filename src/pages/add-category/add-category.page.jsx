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
import {Form, Formik} from "formik";
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

const AddCategoryPage = ({pageMessage, setPageMessage, showLoadingAnimation, hideLoadingAnimation}) => {
    const [filterRowCount, setFilterRowCount] = useState(1);
    const [rowCount, setRowCount] = useState(0);

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

    const handleClearForm = (resetForm) => {
        resetForm();
        setFilterRowCount(1);
        setRowCount(0);
    }

    return (
        <Formik
            initialValues={{detailField: [''], detailValue: [''], filterName: [''], filterRemark: [''], name: ''}}
            onSubmit={async (values, {setSubmitting, resetForm}) => {
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
                        } else if (response.status === 422) {
                            response.json().then(async (jsonResponse) => {
                                setPageMessage({type: 'error', message: Object.entries(jsonResponse.errors)[0][1][0]});
                            });
                        }
                    })
                    .catch((reason => setPageMessage({type: 'error', message: 'Error: ' + reason})))
                    .finally(() => hideLoadingAnimation())
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
                                <PandaCard titleElement={'Category Detail'}
                                           content={<DetailContent rowCount={rowCount} setRowCount={setRowCount}/>}/>
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

                                <CustomButton disabled={isSubmitting} type='submit' text={'Save'}
                                              backgroundColor={'#0884FF'} fontColor={'#FFFFFF'}/>
                                {/*<SaveButton/>*/}
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