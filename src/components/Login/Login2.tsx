import React, {useState} from 'react';
import styled from "styled-components/macro";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as yup from 'yup'
import {connect} from 'react-redux';
import {AppStateType} from "../../redux/redux-store";
import {loginAuth} from "../../redux/Auth/auth-actions";
import {captchaSelect, isAuthSelect, messagesErrorSelect} from '../../redux/Auth/auth-select';
import {Redirect} from "react-router-dom";


type MapStatePropsType = {
    errorMessage: string | null
    captcha: string | null
}

type MapDispatchPropsType = {
    loginAuth: (login: string, password: number, rememberMe: boolean, captcha: string) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

const Login: React.FC<PropsType> = (props) => {

    const [showPassword, setShowPassword] = useState(false)

    const validationSchema = yup.object().shape({
        email: yup.string().max(30),
        password: yup.string().max(30),
    })

    const submit = (values: any) => {
        const {email, password, checkbox,captcha} = values
        props.loginAuth(email, password, checkbox,captcha)
    }


    return (
        <FormWrapper>
            {props.errorMessage && <ErrorWrapper>
                <b>Не удается войти</b><br/>
                Пожалуйста, проверьте правильность написания <b>логина</b> или <b>пароля</b>.
                <List>
                    <li><span>Возможно, нажата клавиша </span><b>Caps Lock</b>?</li>
                    <li><span>Может быть, у Вас включена неправильная <b>раскладка</b> ? (русская или английская)</span></li>
                    <li><span>Попробуйте набрать свой пароль в текстовом редакторе и <b>скопировать</b> в графу «Пароль»</span></li>
                </List>
                Если Вы всё внимательно проверили, но войти всё равно не удается <b>не отчаивайтесь :) </b>
            </ErrorWrapper>}
            <FormContainer>
                <Formik validationSchema={validationSchema} initialValues={{email: '', password: ''}} onSubmit={submit}>
                    {({handleChange,values}) => (
                        <Form>
                            <FormsItem>
                                <Label><Input placeholder={'Email'} autoComplete='email' onChange={handleChange} value={values.email} type='email' name='email'/></Label>
                                <Error name='email' component="div"/>
                            </FormsItem>
                            <FormsItem>
                                <Label><Input placeholder={'Пароль'}  autoComplete='current-password'  onChange={handleChange} value={values.password} type='password' name='password'/></Label>
                                <Error name='password' component="div"/>
                            </FormsItem>
                            <FormsItem>
                                <Label><Input style={{width: '15px'}} onChange={handleChange}  type='checkbox' name='checkbox'/><p>Запомнить меня</p></Label>
                            </FormsItem>
                            <p style={{color: 'red'}}>{props.errorMessage}</p>
                            <CaptchaWrapper>
                                {props.captcha &&
                                <div>
                                    <img src={props.captcha} alt="#"/>
                                    <Label><Input placeholder={'Введите капчу'} onChange={handleChange} type='text' name='captcha'/></Label>
                                </div>
                                }
                            </CaptchaWrapper>
                            <ButtonWrapper>
                                <Button type='submit'>Войти</Button>
                            </ButtonWrapper>
                        </Form>
                    )}
                </Formik>
            </FormContainer>
        </FormWrapper>
    );
};


type ContainerType = {
    isAuth: boolean
    loginAuth: (login: string, password: number, rememberMe: boolean, captcha: string) => void
    errorMessage: string | null
    captcha: string | null
}
const LoginContainer: React.FC<ContainerType> = (props) => {

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <Login captcha={props.captcha} errorMessage={props.errorMessage} loginAuth={props.loginAuth}/>
    )
}

const MapStateToProps = (state: AppStateType) => {
    return {
        isAuth: isAuthSelect(state),
        errorMessage: messagesErrorSelect(state),
        captcha: captchaSelect(state),
    }

}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(MapStateToProps, {loginAuth})(LoginContainer)


const FormWrapper = styled.section`
  background-color: white;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
  border-radius: 4px;
  min-height: 600px;
  display: flex;
  flex-direction: column;  
  justify-content: center;
  align-items: center;
`

const FormContainer = styled.div`
  margin: 0 auto;
  border: 1px solid #d3d9de;
  border-radius: 4px;
  padding: 20px;
`

const FormsItem = styled.div`
  margin-bottom: 10px;
 
`

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  p {
    margin-left: 10px;
  }
`
const Input = styled(Field)`
  background-color: #ffffff;
  border-radius: 3px;
  border: 1px solid #d3d9de;
  color: black;
  font-size: 14px;
  line-height: 16px;
  height: 35px;
  width: 250px;
`

const Error = styled(ErrorMessage)`
  color: red;
  margin-top: 5px;
`

const ButtonWrapper = styled.div`
  margin-top: 30px;
`

export const Button = styled.button`
    padding: 7px 16px 8px;
    margin: 0;
    cursor: pointer;
    text-align: center;
    background-color: #5181b8;
    border: 0;
    border-radius: 4px;
    color: #fff;
    &:hover {
    opacity: 0.88;
    }
    &:active {
    background-color: #4a76a8;
    padding-top: 8px;
    padding-bottom: 7px;
    }
    &:disabled{
    opacity: 0.5;
    }
`

const List = styled.ul`
  padding-left: 30px;
  margin: 20px 0;
  li {
    list-style: initial;
  }
`

const ErrorWrapper = styled.section`
  font-size: 14px;
  line-height: 150%;
  background-color: #ffd6cc;
  border-radius: 4px;
  padding: 30px;
  margin: 20px 0;
`

const CaptchaWrapper = styled.div`
  
`