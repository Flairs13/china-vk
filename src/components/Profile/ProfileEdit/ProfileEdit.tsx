import React from 'react';
import styled from "styled-components/macro";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {ProfileType} from "../../../Types/Types";
import * as yup from 'yup'
import { object } from 'yup';




type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

type Props = {
    profilePage: ProfileType | null
    saveProfile: (profile: ProfileType) => void
    isSaveProfile: boolean
}

const ProfileEdit: React.FC<Props> = (props) => {

    const contactsValidation = () => {
        const obj = {} as any
        Object.keys(props.profilePage?.contacts as ContactsType).forEach(item => {
           obj[item] = yup.string().url('Введите валидный url пример: https://example.com')
        })
        return obj
    }

    const validationSchema = yup.object().shape({
        fullName: yup.string().required('Обязательно'),
        aboutMe: yup.string().required('Обязательно'),
        lookingForAJobDescription: yup.string().required('Обязательно'),
        contacts: object().shape(contactsValidation())

    })

    const submit = (values: any) => {
        props.saveProfile(values)
    }


    return (
        <EditorWrapper>
            <Header>Основное</Header>
            {props.isSaveProfile && <SaveProfileSuccess>Профиль обновлен</SaveProfileSuccess>}
            <Forms>
                <Formik validationSchema={validationSchema} initialValues={props.profilePage as ProfileType} onSubmit={submit}>
                    {({values,errors,touched,handleChange,handleBlur,isValid,dirty}) => (
                        <Form>
                            <FormsItem>
                                <Label>Имя: </Label>
                                <Input onChange={handleChange} onBlur={handleBlur} type='name' name="fullName"/>
                                <Error name="fullName" component="div"/>
                            </FormsItem>
                            <FormsItem>
                                <Label>Обо мне: </Label>
                                <Input type="text" name="aboutMe"/>
                                <Error name="aboutMe" component="div"/>
                            </FormsItem>
                            <FormsItem>
                                <Label>В поисках работы: </Label>
                                <Input type="checkbox" name="lookingForAJob"/>
                                <Error name="lookingForAJob" component="div"/>
                            </FormsItem>
                            <FormsItem>
                                <Label>Skills: </Label>
                                <Input type="text" name="lookingForAJobDescription"/>
                                <Error name="lookingForAJobDescription" component="div"/>
                            </FormsItem>
                            {Object.entries(props.profilePage?.contacts as ContactsType).map((i ) => {
                                    return (
                                            <FormsItem>
                                                <Label>{`${i[0]}`}</Label>
                                                <Input  type='text' name={`contacts.${i[0]}`}/>
                                                <Error name={`contacts.${i[0]}`} component="div"/>
                                            </FormsItem>
                                    )

                                })
                            }
                            {console.log(!isValid,!dirty)}
                            <ButtonWrapper>
                                <Button disabled={!dirty || !isValid} type="submit">Сохранить</Button>
                            </ButtonWrapper>
                        </Form>
                    )}
                </Formik>
            </Forms>
        </EditorWrapper>
    );
};

export default ProfileEdit;


const EditorWrapper = styled.div`
    background-color: white;
    border-radius: 4px 4px 0 0;
`

const Header = styled.div`
    padding: 0 20px;
    border-bottom: 1px solid #e7e8ec;
    display: block;
    height: 54px;
    line-height: 54px;
    font-size: 16px;
    outline: 0;
    color: black;
`

const SaveProfileSuccess = styled.div`
  background-color: greenyellow;
  color: black;
  padding: 15px 0;
`

const Forms = styled.section`
  padding: 30px 10px;
`

const FormsItem = styled.div`
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: [labels] 30% [controls] 1fr;
  column-gap: 10px;
  align-items: center;
 
`
const Label = styled.label`
  color: #656565;
  justify-self: end;
  grid-column: labels;
`

const Input = styled(Field)`
  background-color: #ffffff;
  border-radius: 3px;
  border: 1px solid #d3d9de;
  color: black;
  font-size: 14px;
  line-height: 16px;
  max-width: 300px;
  height: 25px;
  grid-column: controls;
`

const Error = styled(ErrorMessage)`
  color: red;
  grid-column: controls;
  margin-top: 5px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
