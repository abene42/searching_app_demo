import styled from 'styled-components';

export const PandaCardContainer = styled.div`
  height: 700px;
  width: 410px;
  border-radius: 25px;
  background-color: #FFFFFF;
  box-shadow: 5px 5px 50px #F2F2F2;
  margin:0 20px;
`;

export const PandaCardTopSection = styled.div`
  width: 410px;
  height: 80px;
  border-radius: 25px 25px 0 0;
  background-color: #3E4E5E;
  font-size: 20px;
  color: #FFFFFF;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PandaCardBottomSection = styled.div`
  width: 410px;
  height: 620px;
  border-radius: 0 0 25px 25px;
  background-color: #FFFFFF;
  padding: 30px 37px;
  position: relative;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

