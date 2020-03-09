import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import firebase from "../firebase";
import ClassResults from './ClassResults';

const allClasses = [
    { classId: "1", className: "Nerodia Sipedon", commonName: "Northern water snake", isVenomous: false },
    { classId: "2", className: "Thamnophis Sitalis", commonName: "Common garter snake", isVenomous: false },
    { classId: "3", className: "Storeria Dekayi", commonName: "DeKay's brown snake", isVenomous: false },
    { classId: "4", className: "Pantherophis Obsoletus", commonName: "Black rat snake", isVenomous: false },
    { classId: "5", className: "Crotalus Atrox", commonName: "Western diamondback rattlesnake", isVenomous: true },
]

class History extends React.Component {

    constructor(props) {
        super(props);



        this.state = {
            allSightings: []
        }
    }

    componentDidMount() {
        firebase.firestore().collection("sightings").where("user", "==", this.props.user.uid).get()
            .then((querySnapshot) => {
                var allSightings = [];
                querySnapshot.forEach(doc => {
                    var docData = doc.data();
                    var classInfo = allClasses.find(classRes => classRes.classId === docData.classId);
                    allSightings.push({ ...docData, ...classInfo })
                });
                this.setState({ allSightings });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }

    render() {
        const { allSightings } = this.state;

        return (
            <Card>
                <Card.Body>
                    <h2>History</h2>
                    {
                        allSightings && allSightings.length > 0 &&
                        allSightings.map((doc, index) => <ClassResults key={index} classification={doc} />)
                    }
                    {
                        allSightings && allSightings.length == 0 &&
                        <div>
                            <h3 className="text-center text-muted">No previous classifications</h3>
                        </div>
                    }
                </Card.Body>
            </Card>
        );
    }

}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(History);
