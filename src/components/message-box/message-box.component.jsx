import React from 'react';
import {MessageBoxContainer, MessageBoxProgressIndicator} from "./message-box.styles";
import {connect} from "react-redux";
import loadingAnimation from '../../assets/gif/loading.gif';
import {hidePageMessage} from "../../redux/page-message/page-message.actions";
import {createStructuredSelector} from "reselect";
import {selectIsLoading, selectMessage} from "../../redux/page-message/page-message.selectors";

const MessageBox = ({hidePageMessageBox, pageMessage, isLoading}) => (
    (pageMessage !== undefined && pageMessage !== null)
        ? <MessageBoxContainer type={pageMessage.type} onClick={hidePageMessageBox}>
            <p>{pageMessage.message}</p>
        </MessageBoxContainer>
        : (
            isLoading ? <MessageBoxProgressIndicator>
                <img src={loadingAnimation} alt={'loading animation'}/>
            </MessageBoxProgressIndicator> : ''
        )
);

const mapStateToProps = createStructuredSelector({
    pageMessage: selectMessage,
    isLoading: selectIsLoading,
})

const mapDispatchToProps = (dispatch) => ({
    hidePageMessageBox: () => dispatch(hidePageMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);