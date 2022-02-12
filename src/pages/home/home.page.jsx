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
import {
    hideLoadingAnimation,
    showLoadingAnimation,
    showPageMessage
} from "../../redux/page-message/page-message.actions";
import {connect} from "react-redux";

const HomePage = ({setPageMessage, showLoadingAnimation, hideLoadingAnimation}) => {

    // State Hooks
    const [searchData, setSearchData] = useState({});
    const [filteredItems, setFilteredItems] = useState([]);

    // Hooks
    useEffect(() => {
        console.log(searchData)
    }, [searchData])
    const categoryApi = useApi(() => getCategoriesApi.searchCategoryByName(searchData));

    const handleSubmit = async (values) => {
        // values.category = searchData.category?.name
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
                setPageMessage({type: 'error', message: 'Error: ' + reason})
            }))
    }

    return (
        <Formik
            initialValues={{filterFields:[{name:'',value:''}], category:''}}
            onSubmit={handleSubmit}
        >
            {
                ({isSubmitting,values,setFieldValue}) => (
                    <Form>
                        <AddPageContainer>
                            <LeftSection>
                                <Header/>
                                <LeftSectionContent>
                                    <PageTitle>
                                        <p>Search</p>
                                    </PageTitle>
                                    <SearchCard title={'Search by category'} {...{values,setFieldValue,setSearchData}}
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
                                            values.filterFields && values.filterFields[0].name ?
                                                values.filterFields.map((field, index) =>
                                                        <FilterEnteringRow key={index}>
                                                            <p>{field.name}</p>
                                                            <CustomTextField name={`filterFields.${index}.value`}
                                                                             width={'300px'}/>
                                                        </FilterEnteringRow>
                                                    ) :
                                                <NoDataText text={'Choose a category and the filters will appear here'}/>
                                        }
                                        {
                                            values.filterFields && values.filterFields[0].name &&
                                            <div>
                                                <HorizontalDivider/>
                                                <SaveAndCancelSection>
                                                    <CustomButton disabled={isSubmitting} type='submit' text={'Filter'}
                                                                  backgroundColor={'#0884FF'} fontColor={'#FFFFFF'}/>
                                                </SaveAndCancelSection>
                                            </div>
                                        }
                                    </SearchFiltersContainer>
                                    <div>
                                        {
                                            filteredItems && filteredItems?.map((item,index) =>{
                                                return <FilteredItemContainer key={index}>
                                                    {
                                                        Object.entries(item.filters)
                                                            .filter(([key,value])=> key!=='_id' && key !== 'created_at' && key !== 'updated_at')
                                                            .map(([key,value],index) => {
                                                                // console.log(value,' <=> ',key)
                                                                return key !== 'filters'
                                                                ?<div key={index}>
                                                                    <label>{key}: </label>
                                                                    <p>{value}</p>
                                                                </div>
                                                                : Object.entries(value).map(([filterName,filterValue])=>{
                                                                       return <div key={index}>
                                                                            <label>{filterName}: </label>
                                                                            <p>{filterValue}</p>
                                                                        </div>
                                                                    })
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

const mapDispatchToProps = (dispatch) => ({
    setPageMessage: (message) => dispatch(showPageMessage(message)),
    showLoadingAnimation: () => dispatch(showLoadingAnimation()),
    hideLoadingAnimation: () => dispatch(hideLoadingAnimation()),
})

export default connect(null, mapDispatchToProps)(HomePage);