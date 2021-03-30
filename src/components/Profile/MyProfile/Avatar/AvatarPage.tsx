import React, {useEffect} from 'react';
import UserPhoto from "../../../../assets/images/user.png";
import styled from "styled-components/macro";
import {PhotosType, UserType} from '../../../../Types/Types';
import {NavLink} from 'react-router-dom';
import {useSelector} from "react-redux";
import { AppStateType } from '../../../../redux/redux-store';


type Props = {
    photos: PhotosType
    savePhoto: (obj: object) => void
    isOwner: boolean
    users: Array<UserType>
    userId: number | null
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: Array<number>
    getUsersSubs: (userId: number | null) => void
}

const AvatarPage: React.FC<Props> = (props) => {
    const onMainPhotoSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            props.savePhoto(event.target.files[0])
        }
    };

    return (
        <Avatar>
            <AvatarImg>

                <img src={props.photos.large || UserPhoto} alt='#'/>
                {props.isOwner &&
                <PhotoMenuWrapper>
                    <PhotoMenu>
                        <PhotoLink type='file' id={'file'} onChange={onMainPhotoSelected}/>
                        <LinkLabel htmlFor={'file'}>Обновить фотографию</LinkLabel>
                    </PhotoMenu>
                </PhotoMenuWrapper>
                }
            </AvatarImg>
            <AvatarAsideWrapper>
                {props.isOwner ? <NavLink to={'/edit'}>Редактировать</NavLink> : <AvatarAside userId={props.userId}
                                                                                              users={props.users}
                                                                                              follow={props.follow}
                                                                                              unFollow={props.unFollow}
                                                                                              followingInProgress={props.followingInProgress}
                                                                                              getUsersSubs={props.getUsersSubs}
                />}
            </AvatarAsideWrapper>
        </Avatar>
    );
};

export default AvatarPage;


type AvatarProps = {
    users: Array<UserType>
    userId: number | null
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: Array<number>
    getUsersSubs: (userId: number | null) => void

}
const AvatarAside: React.FC<AvatarProps> = (props) => {

    let isFollowed = useSelector((state: AppStateType) => state.usersPage.isUserSubs)

    useEffect(() => {
        props.getUsersSubs(props.userId)
    },[props.userId])




    return (
        <>
            {
                isFollowed
                    ? <button disabled={props.followingInProgress.some(id => id === props.userId)} onClick={() => {
                        props.unFollow(props.userId as number)
                    }}>Убрать из друзей</button>

                    : <button disabled={props.followingInProgress.some(id => id === props.userId)} onClick={() => {
                        props.follow(props.userId as number)
                    }}>Добавить в друзья</button>
            }
        </>
    )
}


const Avatar = styled.div`
background-color: white;
padding: 15px 20px;
grid-column: left;
border-radius: 4px;
box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
min-width: 218px;
 min-height: 218px;
 
`
const PhotoMenuWrapper = styled.div`
   text-align: center;
   position: absolute;
   top: 100%; 
   left: 0px;
   background: rgba(29,32,34,.7);
   width: 100%;
   height: 100%;
   color: #fff;
   transition: all 150ms cubic-bezier(0.4, 0, 1, 1) 0s;
`


const AvatarImg = styled.div`
  position: relative;
  max-width: 230px;
  overflow: hidden;
  :hover ${PhotoMenuWrapper} {
    top: 60%;
  }
  img {
    width: 100%;
    border-radius: 4px;
  }
`

const AvatarAsideWrapper = styled.aside`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  background-color: #e5ebf1;
  border-radius: 4px;
  a {
    display: block;
    height: 34px;
    line-height: 32px;
    color: #2a5885;
  }
  button {
    display: block;
    height: 34px;
    line-height: 32px;
    color: #2a5885;
    background: none;
    border: none;
  }
  :hover {
  background-color: #d3d9de;
  border-radius: 5px;
  }
`
const PhotoLink = styled.input`
  color: white;
  padding-top: 10px;
  display: none;
`
const LinkLabel = styled.label`
  font-size: 16px;
  cursor: pointer;
  :hover {
  opacity: 0.9;
  }
`

const PhotoMenu = styled.div`
  padding-top: 15px;
`







