import firebase from "../firebase";

export const CLASSIFY_REQUEST = "CLASSIFY_REQUEST";
export const CLASSIFY_SUCCESS = "CLASSIFY_SUCCESS";
export const CLASSIFY_FAILURE = "CLASSIFY_FAILURE";
export const HISTORY_REQUEST = "HISTORY_REQUEST";
export const HISTORY_SUCCESS = "HISTORY_SUCCESS";
export const HISTORY_FAILURE = "HISTORY_FAILURE";

const allClasses = [
    { classId: "1", className: "Nerodia Sipedon", commonName: "Northern water snake", isVenomous: false },
    { classId: "2", className: "Thamnophis Sitalis", commonName: "Common garter snake", isVenomous: false },
    { classId: "3", className: "Storeria Dekayi", commonName: "DeKay's brown snake", isVenomous: false },
    { classId: "4", className: "Pantherophis Obsoletus", commonName: "Black rat snake", isVenomous: false },
    { classId: "5", className: "Crotalus Atrox", commonName: "Western diamondback rattlesnake", isVenomous: true },
]

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

const classificationError = error => {
    return {
        type: CLASSIFY_FAILURE,
        error
    };
};

const requestHistory = () => {
    return {
        type: HISTORY_REQUEST
    };
};

const receiveHistory = history => {
    return {
        type: HISTORY_SUCCESS,
        history
    };
};

const historyError = error => {
    return {
        type: HISTORY_FAILURE,
        error
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
            if (!result.error) {
                dispatch(receiveClassification({ ...result.data }));
            } else {
                dispatch(classificationError({ ...result.error }));
            }
        })
        .catch(error => {
            dispatch(classificationError({ message: "An error has occurred. Please try again later." }));
        });
};

export const getHistory = (user) => dispatch => {
    dispatch(requestHistory());
    if (!user.isAuthority) {
        firebase.firestore().collection("sightings").where("user", "==", user.uid).get()
            .then((querySnapshot) => {
                var allSightings = [];
                querySnapshot.forEach(doc => {
                    var docData = doc.data();
                    var classInfo = allClasses.find(classRes => classRes.classId === docData.classId);
                    allSightings.push({ ...docData, ...classInfo })
                });

                dispatch(receiveHistory(allSightings));
            })
            .catch((error) => {
                dispatch(historyError(error));
            })
    } else {
        firebase.firestore().collection("sightings").where("showLoc", "==", true).get()
            .then((querySnapshot) => {
                var allSightings = [];
                querySnapshot.forEach(doc => {
                    var docData = doc.data();
                    var classInfo = allClasses.find(classRes => classRes.classId === docData.classId);
                    allSightings.push({ ...docData, ...classInfo })
                });

                dispatch(receiveHistory(allSightings));
            })
            .catch((error) => {
                dispatch(historyError(error));
            })
    }
}