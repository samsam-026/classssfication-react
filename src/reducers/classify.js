import {
    CLASSIFY_REQUEST,
    CLASSIFY_SUCCESS,
    CLASSIFY_FAILURE,
} from "../actions/classify";

export default (
    state = {
        isClassifying: false,
        classifyError: false,
        classification: {}
    },
    action
) => {
    switch (action.type) {
        case CLASSIFY_REQUEST:
            return {
                ...state,
                isClassifying: true,
                classifyError: false
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
        default:
            return state;
    }
};