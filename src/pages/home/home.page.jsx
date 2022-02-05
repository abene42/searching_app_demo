import React, {useEffect, useState} from 'react';
import {
    AddPageContainer,
    HorizontalDivider,
    LeftSection,
    LeftSectionContent,
    PageFold,
    RightSection,
    SaveAndCancelSection
} from "../add-category/add-category.page.styles";
import useApi from "../../hooks/useApi";
import getCategoriesApi from '../../api/category/category';
import MessageBox from "../../components/message-box/message-box.component";
import {
    FilterAndResultItemContainer,
    FilteredItemContainer,
    FilterEnteringRow,
    SearchFiltersContainer
} from "./home.page.styles";
import CustomTextField from "../../components/custom-text-field/custom-text-field.component";
import Constants from "../../constants";
import {Form, Formik} from "formik";
import NoDataText from "../../components/no-data/no-data.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import Header from "../../components/header/header.component";
import {PageTitle} from "../../components/page-title/page-title.styles";
import SearchCard from "../../components/search-card/search-card.component";

const HomePage = () => {

    // State Hooks
    const [searchData, setSearchData] = useState({});
    const [filteredItems, setFilteredItems] = useState([]);

    // Hooks
    useEffect(() => {
        console.log(searchData)
    }, [searchData])
    const categoryApi = useApi(() => getCategoriesApi.searchCategoryByName(searchData));

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
                values.category = searchData.category?.name
                console.log(values)
                await fetch(Constants.API_URL + '/item/filter', {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                    .then(async (response) => {
                        if (response.status === 200) {
                            response.json().then((jsonResponse) => {
                                setFilteredItems(jsonResponse)
                            })
                        }
                    })
                    .catch((async (reason) => {
                        // setPageMessage({type: 'error', message: 'Error: ' + reason})
                        // await new Promise(resolve => setTimeout(resolve, 5000));
                        // setPageMessage({})
                    }))
            }}
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <AddPageContainer>
                            <LeftSection>
                                <Header/>
                                <LeftSectionContent>
                                    <PageTitle>
                                        <p>Search</p>
                                    </PageTitle>
                                    <SearchCard title={'Search by category'} setSearchData={setSearchData}
                                                searchApi={categoryApi}/>
                                </LeftSectionContent>
                            </LeftSection>
                            <RightSection direction={'row'}>
                                <PageFold>
                                    <p>Filters</p>
                                </PageFold>
                                <FilterAndResultItemContainer>
                                    <SearchFiltersContainer flexDirection={'row'}>
                                        {
                                            searchData?.category?.filters ?
                                                Object.entries(searchData?.category?.filters)
                                                    .map(([filter, desc], index) =>
                                                        <FilterEnteringRow key={index}>
                                                            <p>{filter}</p>
                                                            <CustomTextField name={'filteringValue[' + filter + ']'}
                                                                             width={'300px'}/>
                                                        </FilterEnteringRow>
                                                    ) :
                                                <NoDataText text={'Choose a category and the filters wil appear here'}/>
                                        }
                                        {
                                            searchData?.category?.filters &&
                                            <div>
                                                <HorizontalDivider/>
                                                <SaveAndCancelSection>
                                                    <CustomButton text={'Clear'} type='button'/>
                                                    <CustomButton disabled={isSubmitting} type='submit' text={'Filter'}
                                                                  backgroundColor={'#0884FF'} fontColor={'#FFFFFF'}/>
                                                </SaveAndCancelSection>
                                            </div>
                                        }
                                    </SearchFiltersContainer>
                                    <div>
                                        {
                                            filteredItems?.map((item) =>{
                                                return <FilteredItemContainer>
                                                    {
                                                        Object.entries(item)
                                                            .filter(([key,value])=> key !== 'filters')
                                                            .map(([key,value],index) => {
                                                                // console.log(value,' <=> ',key)
                                                                return <div key={index}>
                                                                    <label>{key}: </label>
                                                                    <p>{value}</p>
                                                                </div>
                                                            })
                                                    }
                                                </FilteredItemContainer>
                                            })
                                        }
                                    </div>
                                </FilterAndResultItemContainer>
                            </RightSection>
                            {
                                categoryApi.error && <MessageBox message={categoryApi.error} type={'error'}/>
                            }
                        </AddPageContainer>
                    </Form>
                )
            }
        </Formik>
    );
}

export default HomePage;