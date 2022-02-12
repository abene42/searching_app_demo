import styled from 'styled-components';

export const SearchFiltersContainer = styled.div`
  flex: 1;
  height: 100%;
  margin: 0 20px 0 50px;
  left: 0;
  bottom: 0;
  //background-color: darkseagreen;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;  
`;

export const FilterEnteringRow = styled.div`
  //background-color: cadetblue;
  width: 500px;
  height: 40px;
  margin:10px;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  p::first-letter {
    text-transform:capitalize;
  }
`;

export const FilteredItemContainer = styled.div`
  box-shadow: 1px 1px 10px #6a6a6a;
  margin: 10px 0;
  padding: 10px 30px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  width: 100%;
  
  label{
    font-size: 14px;
    color: #3E4E5E;
    text-align: right;
    font-weight: bold;
    text-transform:capitalize;
  }
  
  p{
    font-size: 16px;
    display: inline;
    color: #3E4E5E;
    text-align: left;
    text-transform:capitalize;
  }
`;

export const FilterAndResultItemContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
`;