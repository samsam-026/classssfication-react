import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import ClassResults from './ClassResults';
import { getHistory } from '../actions/classify';

class History extends React.Component {

    componentDidMount() {
        const { dispatch, user } = this.props;

        dispatch(getHistory(user));
    }

    render() {
        const { history } = this.props;

        return (
            <Card>
                <Card.Body>
                    <h2>History</h2>
                    {
                        history && history.length > 0 &&
                        history.map((doc, index) => <ClassResults key={index} classification={doc} />)
                    }
                    {
                        history && history.length === 0 &&
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
        history: state.classify.history,
        user: state.auth.user
    };
}
export default connect(mapStateToProps)(History);
