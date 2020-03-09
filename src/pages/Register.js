import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signupUser } from '../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Names must have at least 2 characters")
        .max(100, "Names can't be longer than 100 characters")
        .required("First Name is required"),
    surname: Yup.string()
        .min(2, "Surnames must have at least 2 characters")
        .max(100, "Surnames can't be longer than 100 characters")
        .required("Surname is required"),
    email: Yup.string()
        .email("Must be a valid email address")
        .max(100, "Email must be less than 100 characters")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Passwords must have at least 8 characters")
        .required("Password number required"),
    confirmPwd: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .min(8, "Passwords must have at least 8 characters")
        .required("Confirm Password is required")
});

class Register extends React.Component {

    render() {
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
                <div >
                    <Container style={{ paddingTop: 60 }} fluid>
                        <Row>
                            <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }}>
                                <Card className="card-form">
                                    <Card.Body>
                                        <h2 className="card-title">Register</h2>
                                        <Formik
                                            initialValues={{ firstName: "", surname: "", email: "", password: "", confirmPwd: "" }}
                                            validationSchema={validationSchema}
                                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                                setSubmitting(true);

                                                const { dispatch } = this.props;
                                                var { firstName, surname, email, password } = values;

                                                dispatch(signupUser(firstName, surname, email, password));
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
                                                        <Form.Group controlId="formFirstName">
                                                            <Form.Label>First Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="firstName"
                                                                placeholder="First Name"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.firstName}
                                                                className={touched.firstName && errors.firstName ? "error" : null}
                                                            />
                                                            {touched.firstName && errors.firstName ? (
                                                                <div className="error-message">{errors.firstName}</div>
                                                            ) : null}
                                                        </Form.Group>
                                                        <Form.Group controlId="formSurname">
                                                            <Form.Label>Surname</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="surname"
                                                                placeholder="Surname"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.surname}
                                                                className={touched.surname && errors.surname ? "error" : null}
                                                            />
                                                            {touched.surname && errors.surname ? (
                                                                <div className="error-message">{errors.surname}</div>
                                                            ) : null}
                                                        </Form.Group>
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
                                                        <Form.Group controlId="formBlog">
                                                            <Form.Label>Confirm Password</Form.Label>
                                                            <Form.Control
                                                                type="password"
                                                                name="confirmPwd"
                                                                placeholder="Confirm Password"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.confirmPwd}
                                                                className={touched.confirmPwd && errors.confirmPwd ? "error" : null}
                                                            />
                                                            {touched.confirmPwd && errors.confirmPwd ? (
                                                                <div className="error-message">{errors.confirmPwd}</div>
                                                            ) : null}
                                                        </Form.Group>
                                                        <div className="text-center">
                                                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                                                Submit
                                                        </Button>
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
        isSigningUp: state.auth.isSigningUp,
        signupError: state.auth.signupError,
        isAuthenticated: state.auth.isAuthenticated
    };
}
export default connect(mapStateToProps)(Register);
