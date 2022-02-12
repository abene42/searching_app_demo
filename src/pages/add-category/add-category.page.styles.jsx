import styled, {css} from 'styled-components';
import React from "react";
import {PageTitle} from "../../components/page-title/page-title.styles";

export const AddPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const LeftSection = styled.div`
  height: 100vh;
  flex: 1;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #FFFFFF;
  box-shadow: 1px 0 50px #EFEFEF;
  border-radius: 0 25px 25px 0;
  
  @media screen and (max-width: 1440px){
    padding-left: 20px;
  }
  @media screen and (max-width: 770px){
    padding: 0 50px;
  }
`;

export const LeftSectionContent = styled.div`
  height: 100%;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RightSection = styled.div`
  height: 100vh;
  flex: 3;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
`;

export const PageFold = styled.div`
  background: url("../../assets/icons/page-fold.svg");
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px #DCDCDC;
  width: 200px;
  height: 70px;
  border-radius: 0 0 30px 30px;
  padding: 5px 10px;
  margin-bottom: 100px;
  
  p{
    font-size: 30px;
    color: #3E4E5E;
    font-weight: bold;
  }
`;

export const FiltersContainer = styled.div`
  //background-color: #6a6a6a;
  padding: ${props => `0px ${props.horizontalPadding}` ?? ''};
  display: flex;
  flex-direction: ${props => props.flexDirection ?? 'column'};
  align-items: center;
  justify-content: flex-start;
  //margin: 100px 0 0 0;
  width: 100%;
  height: 580px;
`;

export const FilterContainerBody = styled.div`
  display: flex;
  flex-direction: row;
`;

const FilterColumnsCommonCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
  p{
    color: #3E4E5E;
    font-size: 20px;
    font-weight: normal;
  }
  
  *{
    margin: 7.5px 0;
  }
`;

export const FilterNameColumn = styled.div`
  flex: 1;
  ${FilterColumnsCommonCss}
`;

export const RemarkColumn = styled.div`
  flex: 2;
  ${FilterColumnsCommonCss}
`;

export const RemarkWithRemoveButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
`;

export const HorizontalDivider = styled.div`
  height: 1px;
  width: 80%;
  margin:10px 0;
  background-color: #F2F2F2;
`;

export const SaveAndCancelSection = styled.div`
  //background-color: cadetblue;
  height: 194px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 50px 160px 0 0;
  
  *{
    margin: 0 10px;
  }
`;