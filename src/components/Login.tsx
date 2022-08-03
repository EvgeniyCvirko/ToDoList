import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField, Button} from "@mui/material";
import {useFormik} from "formik";
import {setLoginTC} from "../state/login-reducer";
import {useAppDispatch, useAppSelector} from "../state/hooks";
import {Navigate} from "react-router-dom";


export const Login = () => {
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector<boolean>(state => state.login.isLogin)

        const formik = useFormik({
            validate: (values) => {
                if (!values.email) {
                    return {
                        email: 'Email is required'
                    }
                }
                if (!values.password) {
                    return {
                        password: 'Password is required'
                    }
                }
            },
            initialValues: {
                email: '',
                password: '',
                rememberMe: false
            },
            onSubmit: values => {
                dispatch(setLoginTC(formik.values))
            },
        })
    if (isLogin) {
        return <Navigate to={'/'}/>
    }
        return <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'Remember me'}
                                              control={<Checkbox/>}
                                              {...formik.getFieldProps('Remember me')}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>

}