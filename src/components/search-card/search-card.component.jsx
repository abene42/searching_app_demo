import React, {useRef, useState} from 'react';
import {
    SearchCardContainer,
    SearchCardSearchBar,
    SearchCardSearchBarBorder,
    SearchCardTitle,
    SearchSuggestionButton
} from "./search-card.styles";
import LoadingAnimation from "../loading-animation/loading-animation.component";
import NoDataText from "../no-data/no-data.component";
import {Field} from "formik";

const SearchCard = ({searchApi, setSearchData, values,setFieldValue}) => {
    const searchField = useRef(null);
    const [searchStarted, setSearchStarted] = useState(false);

    const handleOnChange = (changeEvent) => {
        setSearchData((prevState) => ({...prevState, name: changeEvent.target.value}))
        if (changeEvent.target.value.length > 1) {
            setSearchStarted(true);
            searchApi.request()
        } else {
            setSearchStarted(false);
        }
    }

    const handleSuggestionButtonOnClick = (clickEvent) => {
        let category = JSON.parse(clickEvent.currentTarget.getAttribute('data'));
        let filterFields = Object.entries(category.filters).map(([name,description],index)=> ({name:name,value:''}))
        // setSearchData((prevState) => ({...prevState, category: category}));
        searchField.current.value = category.name
        setFieldValue('category',category._id)
        setFieldValue('filterFields',filterFields)
        setSearchStarted(false)
    }

    return (
        <SearchCardContainer>
            <SearchCardTitle>
                <p>Search by Category</p>
            </SearchCardTitle>
            <SearchCardSearchBarBorder searchStarted={searchStarted}>
                <SearchCardSearchBar type={'text'} searchStarted={searchStarted}>
                    <input autoComplete="off" name={'category'} type={'text'} ref={searchField} onFocus={(event)=> event.preventDefault()}
                           onChange={(changeEvent) => handleOnChange(changeEvent)}/>
                    {/*<SearchLogoContainer>*/}
                    {/*    <img src={searchLogo} alt={'search'}/>*/}
                    {/*</SearchLogoContainer>*/}
                </SearchCardSearchBar>
                {
                    searchApi.loading
                        ? <LoadingAnimation/>
                        : (searchApi.data?.length > 0
                        ? searchApi.data.map((searchData) => {
                            return searchData ? (
                                <SearchSuggestionButton
                                    key={searchData._id}
                                    data={JSON.stringify(searchData)}
                                    onClick={handleSuggestionButtonOnClick}>
                                    <p>{searchData.name}</p>
                                </SearchSuggestionButton>
                            ) : ''
                        }) : <NoDataText/>)
                }
            </SearchCardSearchBarBorder>
        </SearchCardContainer>
    );
}

export default SearchCard;