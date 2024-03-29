import firebase from "../firebase";

export const CLASSIFY_REQUEST = "CLASSIFY_REQUEST";
export const CLASSIFY_SUCCESS = "CLASSIFY_SUCCESS";
export const CLASSIFY_FAILURE = "CLASSIFY_FAILURE";
export const HISTORY_REQUEST = "HISTORY_REQUEST";
export const HISTORY_SUCCESS = "HISTORY_SUCCESS";
export const HISTORY_FAILURE = "HISTORY_FAILURE";
export const CHART_REQUEST = "CHART_REQUEST";
export const CHART_SUCCESS = "CHART_SUCCESS";
export const CHART_FAILURE = "CHART_FAILURE";

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

const requestChartValues = () => {
    return {
        type: CHART_REQUEST
    };
};

const receiveChartValues = barValues => {
    return {
        type: CHART_SUCCESS,
        barValues
    };
};

const chartValueError = error => {
    return {
        type: CHART_FAILURE,
        error
    };
};

const uploadImage = ({ userId, processedImage, time, ...data }) => dispatch => {
    urltoFile('data:image/jpeg;base64,' + processedImage, 'tempimage.jpeg', 'image/jpeg')
        .then((file) => {
            let filename = time + ".jpeg";
            const uploadTask = firebase.storage().ref(`${userId}/${filename}`).put(file)
            uploadTask.on('state_changed',
                (snapShot) => { },
                (err) => { },
                () => {
                    firebase.storage().ref(userId).child(filename).getDownloadURL()
                        .then(imageUrl => {
                            firebase.firestore().collection("sightings").doc(time).update({
                                imageUrl
                            }).then(() => {
                                dispatch(receiveClassification({ imageUrl, time, ...data }));
                            }).catch(error => { })
                        })
                })
        });

}

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
                dispatch(uploadImage({ userId, ...result.data }));
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
        firebase.firestore().collection("sightings").orderBy("time", "desc").where("user", "==", user.uid).get()
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
                var allSightings = querySnapshot.docs.map(doc => {
                    return { ...doc.data(), ...allClasses.find(classRes => classRes.classId === doc.data().classId) }
                });

                dispatch(receiveHistory(allSightings));
                dispatch(getChartValues())
            })
            .catch((error) => {
                dispatch(historyError(error));
            })
    }
}

export const getChartValues = () => dispatch => {
    dispatch(requestChartValues());
    firebase.firestore().collection("authority-data").get()
        .then((querySnapshot) => {
            var barValues = querySnapshot.docs.map(doc => doc.data())
            dispatch(receiveChartValues(barValues));
        })
        .catch((error) => {
            dispatch(chartValueError(error));
        })
}

function urltoFile(url, filename, mimeType) {
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
}
