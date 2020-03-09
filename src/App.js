import React from 'react';
import './App.css';
import TopNavBar from './navigation/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Container style={{ paddingTop: 60 }} fluid>
          <Row>
            <Col>
              <h1>App</h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default App;
