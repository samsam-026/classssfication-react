import {
    CLASSIFY_REQUEST,
    CLASSIFY_SUCCESS,
    CLASSIFY_FAILURE,
    HISTORY_REQUEST,
    HISTORY_SUCCESS,
    HISTORY_FAILURE,
    CHART_REQUEST,
    CHART_SUCCESS,
    CHART_FAILURE,
} from "../actions/classify";

export default (
    state = {
        isClassifying: false,
        isLoadingHistory: false,
        isLoadingChart: false,
        classifyError: {},
        classification: {},
        historyError: {},
        history: [],
        barValues: [
            { y: 0, label: "Northern water snake" },
            { y: 0, label: "Common garter snake" },
            { y: 0, label: "DeKay's brown snake" },
            { y: 0, label: "Black rat snake" },
            { y: 0, label: "Western diamondback snake" },
        ],
        chartError: {},
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
        case CHART_REQUEST:
            return {
                ...state,
                isLoadingChart: true,
                chartError: {}
            };
        case CHART_SUCCESS:
            return {
                ...state,
                isLoadingChart: false,
                barValues: action.barValues
            };
        case CHART_FAILURE:
            return {
                ...state,
                isLoadingChart: false,
                chartError: action.error
            };
        default:
            return state;
    }
};