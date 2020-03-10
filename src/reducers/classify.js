import {
    CLASSIFY_REQUEST,
    CLASSIFY_SUCCESS,
    CLASSIFY_FAILURE,
    HISTORY_REQUEST,
    HISTORY_SUCCESS,
    HISTORY_FAILURE,
} from "../actions/classify";

export default (
    state = {
        isClassifying: false,
        isLoadingHistory: false,
        classifyError: {},
        classification: {},
        historyError: {},
        history: []
    },
    action
) => {
    switch (action.type) {
        case CLASSIFY_REQUEST:
            return {
                ...state,
                isClassifying: true,
                classifyError: {}
            };
        case CLASSIFY_SUCCESS:
            return {
                ...state,
                isClassifying: false,
                classification: action.classification
            };
        case CLASSIFY_FAILURE:
            return {
                ...state,
                isClassifying: false,
                classifyError: action.error
            };
        case HISTORY_REQUEST:
            return {
                ...state,
                isLoadingHistory: true,
                historyError: {}
            };
        case HISTORY_SUCCESS:
            return {
                ...state,
                isLoadingHistory: false,
                history: action.history
            };
        case HISTORY_FAILURE:
            return {
                ...state,
                isLoadingHistory: false,
                historyError: action.error
            };
        default:
            return state;
    }
};