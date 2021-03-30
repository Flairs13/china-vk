import React, {useEffect, useState} from 'react'
import Preloader from "../../Preloader/Preloader";
import ProfileStatusHook from "./ProfileStatus/ProfileStatusHooks";
import {ProfileType, UserType} from "../../../Types/Types";
import styled, { keyframes } from "styled-components/macro";
import AvatarPage from "./Avatar/AvatarPage";
import Friends from './Friends/Friends';
import ProfileSideContainer from "./ProfileSide/ProfileSideContainer";


type PropsType = {
    savePhoto: (obj: object) => void
    isOwner: boolean
    userId: number | null
    profilePage: ProfileType | null
    userStatus: string
    updateStatus: (status: string) => void
    users: Array<UserType>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: Array<number>
    getUsersSubs: (userId: number | null) => void
    friendsCount: number
    getRandomFriends: () => void
    randomFriends: Array<UserType>
    auth: boolean
}

const MyProfile: React.FC<PropsType> = (props) => {
    const [isMoreInfo, openMoreInfo] = useState(false)
    useEffect(() => {
        openMoreInfo(false)
    },[props.isOwner])

    if (!props.profilePage) {
        return (
            <>
                <SectionWrapperPreloader>
                    <LeftBlockPreloader>
                        <AvatarPreloader/>
                        <FriendsContainerPreloader/>
                    </LeftBlockPreloader>
                    <RightBlockPreloader>
                        <PageBlockPreloader/>
                        <ProfileSidePreloader/>
                    </RightBlockPreloader>
                </SectionWrapperPreloader>
            </>
        )

    }


    return (
        <SectionWrapper>
            <LeftBlock>
                <AvatarPage userId={props.userId}
                            users={props.users}
                            isOwner={props.isOwner}
                            savePhoto={props.savePhoto}
                            photos={props.profilePage.photos}
                            follow={props.follow}
                            unFollow={props.unFollow}
                            followingInProgress={props.followingInProgress}
                            getUsersSubs={props.getUsersSubs}
                />
                {props.isOwner && <Friends getRandomFriends={props.getRandomFriends} friendsCount={props.friendsCount} randomFriends={props.randomFriends}/>}
            </LeftBlock>
            <RightBlock>
                <PageBlock>
                    <PageTop>
                        <h1>{props.profilePage.fullName}</h1>
                        <ProfileStatusHook isOwner={props.isOwner} status={props.userStatus} updateStatus={props.updateStatus}/>
                    </PageTop>
                    <ProfileInfo>
                        <ProfileInfoItem>
                            {props.isOwner ?
                                <><InfoLabel>День рождения: </InfoLabel><InfoLabeled>{'13 декабря 1993 г.'}</InfoLabeled></>
                                : null}
                        </ProfileInfoItem>
                        <ProfileInfoItem>
                            {props.isOwner ?
                                <><InfoLabel>Город: </InfoLabel><InfoLabeled>{'Москва'}</InfoLabeled></>
                                : null}
                        </ProfileInfoItem>
                        <ProfileInfoItem>
                            <InfoLabel>Skills: </InfoLabel>
                            <InfoLabeled>{props.profilePage.lookingForAJobDescription ? props.profilePage.lookingForAJobDescription : 'пользователь не добавил('}</InfoLabeled>
                        </ProfileInfoItem>
                        <ProfileInfoItem>
                            <InfoLabel>В поисках работы: </InfoLabel>
                            <InfoLabeled>{props.profilePage.lookingForAJob ? 'Да' : 'Нет'}</InfoLabeled>
                        </ProfileInfoItem>
                        <ProfileInfoItem>
                            <InfoLabel>Обо мне: </InfoLabel>
                            <InfoLabeled>{props.profilePage.aboutMe ? props.profilePage.aboutMe : 'пользователь не добавил('}</InfoLabeled>
                        </ProfileInfoItem>
                        <MoreInfo onClick={() => openMoreInfo(prevState => !prevState)}>
                            <a href="#">{isMoreInfo ? 'Скрыть подробную информацию' : 'Показать подробную информацию'}</a>
                        </MoreInfo>
                        {isMoreInfo &&
                        <>
                            <BorderRight>Контакты</BorderRight>
                            {Object.values(props.profilePage.contacts).some((i) => i)
                                ? Object.entries(props.profilePage.contacts).map((i,index) => {
                                        return i[1] ? <ProfileInfoItem key={index}>
                                            <InfoLabel>{i[0]}</InfoLabel>
                                            <InfoLabeled href={i[1]} target="_blank">{i[1]}</InfoLabeled>
                                        </ProfileInfoItem> : null
                                    }
                                ) : <p>Пользователь еще не добавил контакты</p>}
                        </>
                        }

                    </ProfileInfo>
                </PageBlock>
                {props.isOwner && <ProfileSideContainer/>}
            </RightBlock>
        </SectionWrapper>
    )
}

export default MyProfile

const gradient = keyframes`
    0%{
      background-position: 0 10%;
    }
    50%{
       background-position: 0 100%;
    }
    100%{
       background-position: 0 10%;
    }
`;

const ProfileSidePreloader = styled.div`
  background: linear-gradient(51deg, rgb(215,215,215) 0%, rgba(255,255,255,1) 20%, rgb(201,200,200) 100%);
  animation: ${gradient} 1.5s linear infinite;;
  border-radius: 4px;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
  min-height: 50px;
  margin-top: 10px;
`

const SectionWrapper = styled.section`
    display: grid;
    grid-template-columns: [left]1fr [right]2fr;
    grid-gap: 10px;
`

const LeftBlock = styled.div`
  grid-column: left;

`

const RightBlock = styled.div`
   grid-column: right;
   min-width: 0;
`


const PageBlock = styled.div`
  padding: 15px 20px;
  background-color: white;
  border-radius: 4px;
  grid-column: right;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
`

const PageTop = styled.div`
  border-bottom: 1px solid #e7e8ec;
  padding-bottom: 15px;
  h1 {
        font-size: 30px;
        line-height: 25px;
        font-weight: 400;
        padding-bottom: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
  }

`
const ProfileInfo = styled.div`
  padding-top: 10px;
  word-break: break-all;
  padding-bottom: 15px;
 
`

const ProfileInfoItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 10px;
 
`
const InfoLabel = styled.div`
 color: #828282;
`
const InfoLabeled = styled.a`
   color: #2a5885;
   margin-left: 10px;
`

const MoreInfo = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  a {
    display: block;
    height: 34px;
    line-height: 32px;
    color: #2a5885;
    
  }
  :hover {
  background-color: #d3d9de;
  border-radius: 5px;
  }
`
const BorderRight = styled.div`
margin: 15px 0;
 overflow: hidden;
 :after {
content: '';
display: inline-block;
vertical-align: middle;
width: 100%;
height: 1px;
background: #e7e8ec;
border: solid #FFF;
border-width: 0 5px;
margin-right: -100%;
}
    
`



// Снизу Стили для Прелоудера

const SectionWrapperPreloader = styled.section`
    display: grid;
    grid-template-columns: [left]1fr [right]2fr;
    grid-gap: 10px;
`

const FriendsContainerPreloader = styled.div`
  background: linear-gradient(51deg, rgb(215,215,215) 0%, rgba(255,255,255,1) 20%, rgb(201,200,200) 100%); /* w3c */
  background-size: 450% 460%;
  animation: ${gradient} 1.5s linear infinite;;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
  border-radius: 4px;
  margin-top: 10px;
  text-align: center;
  min-width: 258px;
  min-height: 158px;

`

const AvatarPreloader = styled.div`
      background: linear-gradient(51deg, rgb(215,215,215) 0%, rgba(255,255,255,1) 20%, rgb(201,200,200) 100%); /* w3c */
      background-size: 450% 460%;
      animation: ${gradient} 1.5s linear infinite;;
      min-width: 218px;
      min-height: 218px;
      padding: 15px 20px;
      grid-column: left;
      border-radius: 4px;
      box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
 
`

const LeftBlockPreloader = styled.div`
  grid-column: left;
  min-width: 200px;
 
`

const RightBlockPreloader = styled.div`
   grid-column: right;

`

const PageBlockPreloader = styled.div`
  padding: 15px 20px;
  background: linear-gradient(51deg, rgb(215,215,215) 0%, rgba(255,255,255,1) 20%, rgb(201,200,200) 100%); /* w3c */
  background-size: 450% 460%;
  animation: ${gradient} 1.5s linear infinite;;
  border-radius: 4px;
  grid-column: right;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
  min-width: 476px;
  min-height: 252px;
 
`
