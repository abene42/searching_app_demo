import React from "react";
import {NoDataContainer} from "./no-data.styles";

const NoDataText = ({text}) => (
    <NoDataContainer>
        <p>{text ?? 'No Match'}</p>
    </NoDataContainer>
);

export default NoDataText;