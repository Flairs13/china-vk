import React from 'react';
import styled from "styled-components/macro";
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../Utils/Validators/Validators";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {loginAuth} from "../../redux/Auth/auth-actions";



const maxLength = maxLengthCreator(30)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder={'Логин'} name={'login'} typeField={'input'} validate={[required,maxLength]} component={FormControl} type={'text'}/>
            <Field placeholder={'Пароль'} typeField={'input'} name={'password'} validate={[required,maxLength]} component={FormControl} type={'password'}/>
            <Label><Field placeholder={'Запомнить меня'} name={'rememberMe'} component={'input'} type={'checkbox'}/>Запомнить меня</Label>
            <div>{props.error && <span>{props.error}</span>}</div>
            <button type={'submit'}>Войти</button>
        </form>
    );
};

const LoginReduxForm = reduxForm ({form: 'login'})(LoginForm)



const Login = (props) => {

    const onSubmit = (formData) => {
        props.loginAuth(formData.login, formData.password,formData.rememberMe)
    }

    if (props.auth.isAuth) {
      return  <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps,{loginAuth})(Login);

const Label = styled.label`
  margin-bottom: 20px;
`