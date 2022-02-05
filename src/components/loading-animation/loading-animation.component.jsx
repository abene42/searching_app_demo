import React from "react";
import {LoadingAnimationContainer} from "./loading-animation.styles";
import loadingAnimation from '../../assets/gif/loading.gif';

const LoadingAnimation = () => (
    <LoadingAnimationContainer>
        <img src={loadingAnimation} alt={'loading animation'}/>
    </LoadingAnimationContainer>
);

export default LoadingAnimation;