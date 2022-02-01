import React, {useState} from 'react';
import {PandaCardBottomSection, PandaCardContainer, PandaCardTopSection} from "./panda-card.styles";
import CustomScroll from 'react-custom-scroll';
import '/node_modules/react-custom-scroll/dist/customScroll.css';

const PandaCard = (props) => {
    return (
        <PandaCardContainer>
            <PandaCardTopSection>
                {props.titleElement}
            </PandaCardTopSection>
            <CustomScroll keepAtBottom={true}>
                <PandaCardBottomSection>
                    {props.content}
                </PandaCardBottomSection>
            </CustomScroll>
        </PandaCardContainer>
    );
}

export default PandaCard;