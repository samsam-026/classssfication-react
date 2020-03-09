import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

class History extends React.Component {

    render() {
        return (
            <Card>
                <Card.Body>
                    <h2>History</h2>
                </Card.Body>
            </Card>
        );
    }

}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };
}
export default connect(mapStateToProps)(History);
