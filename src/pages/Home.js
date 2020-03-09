import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { logoutUser } from '../actions/auth';
import { connect } from 'react-redux';

class Home extends React.Component {

    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };

    render() {
        const { isLoggingOut, logoutError } = this.props;
        return (
            <div>
                <Container style={{ paddingTop: 60 }} fluid>
                    <Row>
                        <Col>
                            <h1>Home</h1>
                            <button onClick={this.handleLogout}>Logout</button>
                            {isLoggingOut && <p>Logging Out....</p>}
                            {logoutError && <p>Error logging out</p>}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };
}
export default connect(mapStateToProps)(Home);
