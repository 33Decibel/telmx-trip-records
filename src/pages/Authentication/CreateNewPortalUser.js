import React, { useEffect, useState, useCallback } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Alert,
  Spinner,
} from 'reactstrap';
import ParticlesAuth from '../AuthenticationInner/ParticlesAuth';
import Welcome from '@assets/images/anims/Animation-Hi.gif';
import GoTPRobo from '@assets/images/anims/GoTP-Robo.gif';
import Loader from '@Components/Common/LoaderWhiteBg';

//redux
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
// actions
import { getUserInviteInfo, registerPortalAdmin } from '../../store/actions';

import logoWhite from '../../assets/images/logo/gotpwhite.png';

//Import config
import withRouter from '../../Components/Common/withRouter';

const CreateNewPortalUser = (props) => {
  document.title = `${process.env.REACT_APP_NAME} - Register Portal Admin`;
  const dispatch = useDispatch();
  const history = useNavigate();
  const { inviteId } = useParams();

  const fetchData = useCallback(() => {
    dispatch(getUserInviteInfo(inviteId));
  }, [dispatch, inviteId]);

  useEffect(() => {
    if (inviteId) fetchData();
  }, [inviteId, fetchData]);

  const { error, invitedUserInfo, adminRegisterStatus, adminRegisterCalled } =
    useSelector((state) => ({
      error: state.Login.error,
      invitedUserInfo: state.Login.invitedUserInfo,
      adminRegisterStatus: state.Login.adminRegisterStatus,
      adminRegisterCalled: state.Login.adminRegisterCalled,
    }));

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);

  const [isValidUser, setIsValidUser] = useState({ valid: false, msg: '' });
  const [isValidPass, setIsValidPass] = useState({ valid: false, msg: '' });
  const [isValidConfirmPass, setIsValidConfirmPass] = useState({
    valid: false,
    msg: '',
  });
  const [isValidData, setIsValidData] = useState(false);

  useEffect(() => {
    if (username.length > 0 && username.length < 7) {
      setIsValidUser({ valid: false, msg: 'Minimum 7 characters' });
    } else {
      setIsValidUser({ valid: true, msg: '' });
    }
    if (username.length === 0) setIsValidUser({ valid: false, msg: '' });
  }, [username]);

  useEffect(() => {
    const isPasswordValid = password.length >= 7;
    const isConfirmPasswordValid = confirmPassword.length >= 7;
    const passwordsMatch = password === confirmPassword;

    if (password.length > 0 && !isPasswordValid) {
      setIsValidPass({ valid: false, msg: 'Minimum 7 characters' });
    } else {
      setIsValidPass({ valid: true, msg: '' });
    }
    if (password.length === 0) setIsValidPass({ valid: false, msg: '' });

    if (confirmPassword.length > 0) {
      if (!isConfirmPasswordValid) {
        setIsValidConfirmPass({ valid: false, msg: 'Minimum 7 characters' });
      } else if (!passwordsMatch) {
        setIsValidConfirmPass({ valid: false, msg: 'Passwords do not match' });
      } else {
        setIsValidConfirmPass({ valid: true, msg: '' });
      }
    } else {
      setIsValidConfirmPass({ valid: true, msg: '' });
    }
    if (confirmPassword.length === 0)
      setIsValidConfirmPass({ valid: false, msg: '' });
  }, [password, confirmPassword]);

  useEffect(() => {
    setIsValidData(
      isValidUser.valid && isValidPass.valid && isValidConfirmPass.valid
    );
  }, [isValidUser, isValidPass, isValidConfirmPass]);

  const submitUserRequest = () => {
    dispatch(
      registerPortalAdmin({
        username,
        password,
        inviteId,
      })
    );
  };

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className='auth-page-content'>
          <Container>
            <Row>
              <Col lg={12}>
                <div className='text-center mt-sm-5 mb-4 text-white'>
                  <div>
                    <Link to='/' className='d-inline-block auth-logo'>
                      <img src={logoWhite} alt='' height='50' />
                    </Link>
                  </div>
                  <p className='mt-1 fs-15 fw-medium'>
                    {process.env.REACT_APP_TAGLINE}
                  </p>
                </div>
              </Col>
            </Row>

            <Row className='justify-content-center'>
              <Col md={8}>
                <Card className='mt-2'>
                  <CardBody className='p-4'>
                    <Row>
                      <Col>
                        {adminRegisterStatus?.status === 'ERROR' ? (
                          <Alert color='danger'>
                            {' '}
                            {adminRegisterStatus?.msg}{' '}
                          </Alert>
                        ) : null}
                      </Col>
                    </Row>
                    {invitedUserInfo ? (
                      invitedUserInfo.status === 'OK' ? (
                        adminRegisterStatus?.status !== 'OK' ? (
                          <Row>
                            <Col>
                              <div className='mt-2'>
                                <p className='text-center'>
                                  <img
                                    src={Welcome}
                                    className=''
                                    alt='Welcome'
                                  />
                                </p>
                                <h5 className='text-primary text-center'>
                                  Welcome {invitedUserInfo?.data.fName}!
                                </h5>
                                <p className='text-muted mb-1'>
                                  <strong className='text-primary'>
                                    {invitedUserInfo?.data.portalName}
                                  </strong>{' '}
                                  portal, is now ready.
                                </p>
                                <p className='text-muted'>
                                  You have been invited to manage as{' '}
                                  <strong className='text-primary'>
                                    {invitedUserInfo?.data.role ===
                                    'PORTAL_ADMIN'
                                      ? 'Portal Admin'
                                      : invitedUserInfo?.data.role ===
                                        'BRANCH_ADMIN'
                                      ? 'Branch Admin'
                                      : 'Admin'}
                                  </strong>{' '}
                                  . Please create a unique username and password
                                  to proceed.
                                </p>
                              </div>
                            </Col>
                            <Col>
                              <div className='p-2 mt-0'>
                                <div className='mb-3'>
                                  <label
                                    htmlFor='username'
                                    className='form-label'
                                  >
                                    Username
                                  </label>
                                  <div className='form-icon right'>
                                    <input
                                      name='username'
                                      className='form-control form-control-icon'
                                      placeholder='Enter username'
                                      type='text'
                                      onChange={(e) => {
                                        setUsername(e.target.value);
                                      }}
                                      // onBlur={validation.handleBlur}
                                      value={username}
                                    />

                                    {username.length > 6 ? (
                                      isValidUser.valid ? (
                                        <i className='text-success ri-checkbox-circle-fill position-absolute top-0'></i>
                                      ) : (
                                        <i className='text-danger ri-close-circle-fill position-absolute top-0'></i>
                                      )
                                    ) : (
                                      ''
                                    )}
                                    <section className='fs-10 text-danger'>
                                      {isValidUser.msg}
                                    </section>
                                  </div>
                                </div>

                                <div className='mb-3'>
                                  <Label
                                    className='form-label'
                                    htmlFor='password'
                                  >
                                    Password
                                  </Label>
                                  <div className='position-relative auth-pass-inputgroup mb-3'>
                                    <Input
                                      name='password'
                                      type={passwordShow ? 'text' : 'password'}
                                      className='form-control pe-5'
                                      placeholder='Enter Password'
                                      value={password}
                                      onChange={(e) => {
                                        setPassword(e.target.value);
                                      }}
                                      // onBlur={validation.handleBlur}
                                    />

                                    <button
                                      className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted'
                                      type='button'
                                      id='password-addon'
                                      onClick={() =>
                                        setPasswordShow(!passwordShow)
                                      }
                                    >
                                      <i className='ri-eye-fill align-middle'></i>
                                    </button>
                                    <section className='fs-10 text-danger'>
                                      {isValidPass.msg}
                                    </section>
                                  </div>
                                </div>
                                <div className='mb-3'>
                                  <Label
                                    className='form-label'
                                    htmlFor='confirm-password'
                                  >
                                    Confirm Password
                                  </Label>
                                  <div className='position-relative auth-pass-inputgroup mb-3'>
                                    <Input
                                      name='confirm-password'
                                      type={passwordShow ? 'text' : 'password'}
                                      className='form-control pe-5'
                                      placeholder='Confirm Password'
                                      value={confirmPassword}
                                      onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                      }}
                                      // onBlur={validation.handleBlur}
                                    />

                                    <button
                                      className='btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted'
                                      type='button'
                                      id='password-addon'
                                      onClick={() =>
                                        setPasswordShow(!passwordShow)
                                      }
                                    >
                                      <i className='ri-eye-fill align-middle'></i>
                                    </button>
                                    <section className='fs-10 text-danger'>
                                      {isValidConfirmPass.msg}
                                    </section>
                                  </div>
                                </div>

                                <div className='mt-4'>
                                  <Button
                                    color='success'
                                    disabled={
                                      !isValidData
                                        ? true
                                        : error
                                        ? null
                                        : adminRegisterCalled
                                        ? true
                                        : false
                                    }
                                    className='btn btn-success w-100'
                                    onClick={() => {
                                      submitUserRequest();
                                    }}
                                  >
                                    {!isValidData ? (
                                      'Provide Userame & Password'
                                    ) : error ? (
                                      'Activate Your Account'
                                    ) : adminRegisterCalled ? (
                                      <Spinner size='sm' className='me-2'>
                                        Loading...
                                      </Spinner>
                                    ) : (
                                      'Activate Your Account'
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ) : (
                          <Row>
                            <Col sm={4}>
                              <div className='mt-2'>
                                <p className='text-center'>
                                  <lord-icon
                                    src='https://cdn.lordicon.com/lupuorrc.json'
                                    trigger='loop'
                                    colors='primary:#0ab39c,secondary:#405189'
                                    style={{ width: '120px', height: '120px' }}
                                  ></lord-icon>
                                </p>
                              </div>
                            </Col>
                            <Col>
                              <div className='mt-2'>
                                <h5 className='text-primary'>
                                  Congratulations!
                                </h5>
                                <p className='text-muted'>
                                  Your access to the portal has been created.
                                  Please log in with your new credentials to
                                  start using the portal.
                                </p>
                                <button
                                  type='button'
                                  className='btn btn-success  waves-effect waves-light rounded-end'
                                  onClick={() => history('/login')}
                                >
                                  Please Login
                                </button>
                              </div>
                            </Col>
                          </Row>
                        )
                      ) : (
                        <Row>
                          <Col>
                            <div className='mt-2'>
                              <p className='text-center'>
                                <img
                                  src={GoTPRobo}
                                  height={'140px'}
                                  className=''
                                  alt='TelMX Robo'
                                />
                              </p>
                            </div>
                          </Col>
                          <Col>
                            <div className='mt-2'>
                              <h5 className='text-primary'>Oppssss!</h5>
                              <p className='text-muted'>
                                The invite you are looking for has either
                                expired or is no longer available. Please
                                contact your administrator to receive a new
                                invite.
                              </p>
                            </div>
                          </Col>
                        </Row>
                      )
                    ) : (
                      <Loader />
                    )}
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

export default withRouter(CreateNewPortalUser);
