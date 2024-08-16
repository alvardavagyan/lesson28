import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBSwitch,
}
    from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PartialUser } from '../../../helpers/types';
import { handleChange, handleLogout, updateLogin, updatePassword, verifyUser } from '../../../helpers/api';

export const UpdateAccount = () => {

    const { register: regPassword, handleSubmit: handleNewPassword } = useForm<PartialUser>()
    const { register: regLogin, handleSubmit: handleNewLogin } = useForm<PartialUser>()
    const navigate = useNavigate()
    const [errorPassword, setErrorPassword] = useState<string>("")
    const [errorLogin, setErrorLogin] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [isPrivate, setIsPrivate] = useState<number | undefined>(0)


    useEffect(() => {
        const Privacy = async () => {
            const response = await verifyUser()
            if (response.user) {
                setIsPrivate(response.user.isPrivate)
            }
        }
        Privacy()
    }, [])


    const handlePasswordForm: SubmitHandler<PartialUser> = (user) => {
        updatePassword(user)
            .then(response => {
                if (response.status === 'error' && response.message) {
                    setErrorPassword(response.message)
                } else {
                    setErrorPassword('')
                    handleLogout()
                    navigate('/login')
                }
            })
    }

    const handleLoginForm: SubmitHandler<PartialUser> = (user) => {
        updateLogin(user)
            .then(response => {
                if (response.status === 'error' && response.message) {
                    setErrorLogin(response.message)
                } else {
                    setErrorLogin('')
                    handleLogout()
                    navigate('/login')
                }
            })
    }

    const handleChangePrivacy = async () => {
        const accountStatus = isPrivate == 0 ? 1 : 0
        const response = await handleChange({ isPrivate: accountStatus })
        if (response.status === "error" && response.message) {
            setError(response.message)
        } else {
            setIsPrivate(accountStatus)
            setError("")
        }
    }

    return <>
        <MDBContainer fluid>
            <MDBRow lg='5'>
                <MDBCol lg="5">
                    <MDBCard className='my-4 rounded-1'>
                        <MDBCardBody className='px-5'>
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Account Privacy</h3>
                            {error && <p className='alert alert-danger'>{error}</p>}
                            <MDBSwitch
                                id='publicPrivateSwitch'
                                label={`This account is ${isPrivate == 1 ? 'Private' : 'Public'}`}
                                checked={isPrivate == 1}
                                onChange={handleChangePrivacy}
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>



            <MDBRow lg='5'>
                <MDBCol lg='5'>
                    <MDBCard className='my-4 rounded-3'>
                        <MDBCardBody className='px-5'>
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Update Password</h3>
                            <form onSubmit={handleNewPassword(handlePasswordForm)}>
                                {errorPassword && <p className='alert alert-danger'>{errorPassword}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Current password'
                                    type='password'
                                    {...regPassword('old')}
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='New password'
                                    type='password'
                                    {...regPassword('newpwd')}
                                />
                                <button type='submit' className='btn btn-outline-info'>Update Password</button>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>


            <MDBRow lg='5'>
                <MDBCol lg='5'>
                    <MDBCard className='my-4 rounded-3'>
                        <MDBCardBody className='px-5'>
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Update Login</h3>
                            <form onSubmit={handleNewLogin(handleLoginForm)}>
                                {errorLogin && <p className='alert alert-danger'>{errorLogin}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='New login'
                                    type='text'
                                    {...regLogin('login')}
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Current password'
                                    type='password'
                                    {...regLogin('password')}
                                />
                                <button type='submit' className='btn btn-outline-info'>Update Login</button>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </>
}
