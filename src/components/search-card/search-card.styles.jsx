import styled, {css} from 'styled-components';
import LoadingAnimation from "../loading-animation/loading-animation.component";

export const SearchCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height:340px ;
`;

export const SearchCardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 50px;
  
  p{
    font-size: 34px;
    font-weight: 400;
    line-height: 51px;
    color: #3E4E5E;
  }
`;

export const SearchCardSearchBarBorder = styled.div`
  ${({searchStarted, searchEnded})=> {
      if(searchStarted){
          return css`
            height: 294px;
            transition: height 0.25s ease-in;
            p{
              display: inline-block;
            }
          `;
      }else{
          return css`
            height: 70px;
            transition: height 0.25s ease-out;
            p{
              display: none;
            }
          `;
      }
  }};
  width: 400px;
  border-radius: 25px;
  background-color: #FFFFFF;
  border:0.2px solid #AAAAAA;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  p{
    font-size: 24px;
    font-weight: 200;
    color: #6a6a6a;
    text-align: center;
    margin: auto;
  }
`;

export const SearchCardSearchBar = styled.div`
  width: 363px;
  height: 70px;
  ${({searchStarted})=> searchStarted ? css`border-bottom: 1px solid #AAAAAA`: '' };
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  input{
    outline: none;
    border: none;
    height: 60px;
    width: 310px;
    padding-left: 20px;
    font-size: 30px;
    font-weight: lighter;
    color: #3E4E5E;
    
    &:first-letter {
      text-transform:capitalize;
    }
  }
`;

export const SearchLogoContainer = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 100px;
  border: 0.2px solid #AAAAAA;
  position: absolute;
  right: 0;
  cursor:pointer;
`;

export const SearchSuggestionButton = styled.div`
  width: 95%;
  height: 50px;
  border-radius: 2px;
  background-color: #FFFFFF;
  //margin: 5px 0;
  padding-left: 30px;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  border-bottom: 1px solid #F2F2F2;
  cursor:pointer;
  
  p{
    font-size: 25px;
    font-weight: 400;
    color: #3E4E5E;
  }
  
  &:hover{
    background-color: #0080FF;
    
    p{
      color: #FFFFFF;
    }
  }
`;
