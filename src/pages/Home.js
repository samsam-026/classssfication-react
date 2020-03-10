import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Classify from '../components/Classify';
import History from '../components/History';

class Home extends React.Component {

    constructor(props) {
        super();
        this.state = {
            activeTab: props.activeTab || 1
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedTab) {
        this.setState({
            activeTab: selectedTab
        });
    }

    render() {
        return (
            <div>
                <Container style={{ paddingTop: 60 }} fluid>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                            <Tabs fill className="myClass" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                                <Tab eventKey={1} title="Classify Snake">
                                    <Classify />
                                </Tab>
                                <Tab eventKey={2} title="History">
                                    <History />
                                </Tab>
                            </Tabs>
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
