import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Must be a valid email address")
        .max(100, "Email must be less than 100 characters")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Passwords must have at least 8 characters")
        .required("Password number required"),
});

class Login extends React.Component {

    render() {
        const { isAuthenticated, user, isVerifying } = this.props;
        if (isAuthenticated) {
            if (user.isAuthority) {
                return <Redirect to="/map" />;
            }
            return <Redirect to="/" />;
        } else {
            return (
                <div>
                    <Container style={{ paddingTop: 65 }} fluid>
                        <Row>
                            <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                                <Card className="card-form">
                                    <Card.Body>
                                        <h2 className="card-title">Login</h2>
                                        <Formik
                                            initialValues={{ email: "", password: "" }}
                                            validationSchema={validationSchema}
                                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                                setSubmitting(true);

                                                const { dispatch } = this.props;
                                                var { email, password } = values;

                                                dispatch(loginUser(email, password));
                                            }}
                                        >
                                            {({ values,
                                                errors,
                                                touched,
                                                handleChange,
                                                handleBlur,
                                                handleSubmit,
                                                isSubmitting }) => (
                                                    <Form onSubmit={handleSubmit}>
                                                        <Form.Group controlId="formEmail">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                name="email"
                                                                placeholder="Email"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.email}
                                                                className={touched.email && errors.email ? "error" : null}
                                                            />
                                                            {touched.email && errors.email ? (
                                                                <div className="error-message">{errors.email}</div>
                                                            ) : null}
                                                        </Form.Group>
                                                        <Form.Group controlId="formPassword">
                                                            <Form.Label>Password</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                name="password"
                                                                placeholder="Password"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.password}
                                                                className={touched.password && errors.password ? "error" : null}
                                                            />
                                                            {touched.password && errors.password ? (
                                                                <div className="error-message">{errors.password}</div>
                                                            ) : null}
                                                        </Form.Group>

                                                        <div className="text-center">
                                                            {isSubmitting || isVerifying ? <Spinner animation="border" variant="primary"  /> : <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>}
                                                        </div>
                                                    </Form>
                                                )}
                                        </Formik>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }

}
function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        isVerifying: state.auth.isVerifying,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(Login);
