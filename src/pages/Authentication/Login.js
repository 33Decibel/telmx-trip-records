import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from 'reactstrap';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

// Formik validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

// actions
import { loginUser, resetLoginFlag } from '../../store/actions';

import logoWhite from '../../assets/images/logo/logo-light.png';

//Import config
import withRouter from '../../Components/Common/withRouter';

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.Login);
  const { errorMsg, loading, error } = loginState;

  const [userLogin, setUserLogin] = useState([]);
  const [passwordShow, setPasswordShow] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username:
        userLogin.username || process.env.REACT_APP_LOGIN_USERNAME || '',
      password:
        userLogin.password || process.env.REACT_APP_LOGIN_PASSWORD || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Please Enter Your Username'),
      password: Yup.string().required('Please Enter Your Password'),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetLoginFlag());
      }, 3000);
    }
  }, [dispatch, error]);

  document.title = `${process.env.REACT_APP_NAME} - Login`;
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className='auth-page-content'>
          <Container>
            <Row>
              <Col lg={12}>
                <div className='text-center text-white'>
                  <div style={{ fontSize: '50px' }}>
                    <Link to='/' className='d-inline-block auth-logo'>
                      <img src={logoWhite} alt='' height='100' />
                    </Link>
                  </div>
                  <p className='mt-1 fs-15 fw-medium'>
                    {process.env.REACT_APP_TAGLINE}
                  </p>
                </div>
              </Col>
            </Row>

            <Row className='justify-content-center'>
              <Col md={8} lg={6} xl={5}>
                <Card className='mt-2'>
                  <CardBody className='p-4'>
                    <div className='text-center mt-2'>
                      <h5 className='text-primary'>Welcome Back !</h5>
                      <p className='text-muted'>
                        Sign in to continue to {process.env.REACT_APP_NAME}
                      </p>
                    </div>
                    {errorMsg && errorMsg ? (
                      <Alert color='danger'> {errorMsg} </Alert>
                    ) : null}
                    <div className='p-2 mt-0'>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        action='#'
                      >
                        <div className='mb-3'>
                          <Label htmlFor='username' className='form-label'>
                            Username
                          </Label>
                          {/* <Input
                            name='username'
                            className='form-control'
                            placeholder='Enter username'
                            type='text'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.username || ''}
                            invalid={
                              validation.touched.username &&
                              validation.errors.username
                                ? true
                                : false
                            }
                          /> */}
                          <Input
                            name='username'
                            className='form-control'
                            placeholder='Enter username'
                            type='text'
                            onChange={(e) => {
                              e.target.value = e.target.value.trimStart(); // Trim start only to avoid jumping cursor
                              validation.handleChange(e);
                            }}
                            onBlur={(e) => {
                              e.target.value = e.target.value.trim(); // Trim full on blur
                              validation.handleChange(e);
                              validation.handleBlur(e);
                            }}
                            value={validation.values.username || ''}
                            invalid={
                              validation.touched.username &&
                              validation.errors.username
                                ? true
                                : false
                            }
                          />
                          {validation.touched.username &&
                          validation.errors.username ? (
                            <FormFeedback type='invalid'>
                              {validation.errors.username}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className=''>
                          {/* <div className="float-end">
                            <Link to="/forgot-password" className="text-muted">
                              Forgot password?
                            </Link>
                          </div> */}
                          <Label
                            className='form-label'
                            htmlFor='password-input'
                          >
                            Password
                          </Label>
                          <div className='position-relative auth-pass-inputgroup mb-3'>
                            {/* <Input
                              name='password'
                              value={validation.values.password || ''}
                              type={passwordShow ? 'text' : 'password'}
                              className='form-control pe-5'
                              placeholder='Enter Password'
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            /> */}

                            <Input
                              name='password'
                              value={validation.values.password || ''}
                              type={passwordShow ? 'text' : 'password'}
                              className='form-control pe-5'
                              placeholder='Enter Password'
                              onChange={(e) => {
                                e.target.value = e.target.value.trimStart(); // Trim start to avoid cursor jump
                                validation.handleChange(e);
                              }}
                              onBlur={(e) => {
                                e.target.value = e.target.value.trim(); // Trim full on blur
                                validation.handleChange(e);
                                validation.handleBlur(e);
                              }}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type='invalid'>
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                            {!validation.errors.password && (
                              <button
                                className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted'
                                type='button'
                                id='password-addon'
                                onClick={() => setPasswordShow(!passwordShow)}
                              >
                                <i className='ri-eye-fill align-middle'></i>
                              </button>
                            )}
                          </div>
                        </div>

                        <div className='form-check d-none'>
                          <Input
                            className='form-check-input'
                            type='checkbox'
                            value=''
                            id='auth-remember-check'
                          />
                          <Label
                            className='form-check-label'
                            htmlFor='auth-remember-check'
                          >
                            Remember me
                          </Label>
                        </div>

                        <div className='mt-3'>
                          <Button
                            color='success'
                            disabled={error ? null : loading ? true : false}
                            className='btn btn-success w-100'
                            type='submit'
                          >
                            {error ? null : loading ? (
                              <Spinner size='sm' className='me-2'>
                                Loading...
                              </Spinner>
                            ) : null}
                            Sign In
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Login);
