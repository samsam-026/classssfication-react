export const CLASSIFY_REQUEST = "CLASSIFY_REQUEST";
export const CLASSIFY_SUCCESS = "CLASSIFY_SUCCESS";
export const CLASSIFY_FAILURE = "CLASSIFY_FAILURE";

const requestClassification = () => {
    return {
        type: CLASSIFY_REQUEST
    };
};

const receiveClassification = classification => {
    return {
        type: CLASSIFY_SUCCESS,
        classification
    };
};

const classificationError = () => {
    return {
        type: CLASSIFY_FAILURE
    };
};

export const classifySnake = (file, userId) => dispatch => {
    dispatch(requestClassification());
    var data = new FormData()
    data.append('file', file)
    data.append('user', userId)

    fetch("https://fyp-classssfication.herokuapp.com/predict", {
    // fetch("http://localhost:5000/predict", {
        mode: "cors",
        method: "POST",
        body: data,
    }).then(response => response.json())
        .then(result => {
            dispatch(receiveClassification({...result.data}));
        })
        .catch(error => {
            dispatch(classificationError());
        });
};