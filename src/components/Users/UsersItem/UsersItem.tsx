import React from "react";
import User from '../../../assets/images/user.png'
import {NavLink} from "react-router-dom";
import styled from "styled-components/macro";
import Preloader from "../../Preloader/Preloader";

type PropsType = {
    followingInProgress: Array<number>
    followUser: (userId: number) => void
    unFollowUser: (userId: number) => void
    status: string
    name: string
    followed: boolean
    photo: string | null
    id: number | null
    isFetching: boolean
}


const usersItem: React.FC<PropsType> = (props) => {
    return (
        <ItemContainer>
            {!props.isFetching ? <>
                <Avatar>
                    <NavLink to={`/profile/${props.id}`}>
                        <img src={props.photo != null ? props.photo : User} alt={'#'}/>
                    </NavLink>
                </Avatar>
                <ItemInfo>
                    <UsersInfo>
                        <UsersName>
                            <p>{props.name}</p>
                        </UsersName>
                        <ItemStatus>{props.status ? props.status : 'Нет статуса'}</ItemStatus>
                    </UsersInfo>
                    {
                        props.followed

                            ? <SubsButton disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {
                                props.unFollowUser(props.id as number)
                            }}>Убрать из друзей</SubsButton>

                            : <SubsButton disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {
                                props.followUser(props.id as number)
                            }}>Добавить в друзья</SubsButton>
                    }
                </ItemInfo>
            </> : <PreloaderWrapper><Preloader/></PreloaderWrapper>
            }
        </ItemContainer>
    )
}

export default usersItem

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e7e8ec;
    min-height: 120px;
`

const Avatar = styled.div`
  margin-right: 15px;
  width: 100px;
  min-width: 100px;
  min-height: 100px;
  img {
     width: 100%;
     border-radius: 50%;
     background-color: #f0f2f5;
  }
`

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    color: #2a5885;
    font-weight: 700;
    border: 1px solid #ffffff;
    border-radius: 5px;
    max-width: 100%;
    overflow: hidden;
 
`

const UsersInfo = styled.div`
  
`

const UsersName = styled.div`
   margin-bottom: 12px;
   p {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
   }
`

const ItemStatus = styled.div`
   color: #656565;
   font-weight: 400;
   margin-bottom: 5px;
   overflow: hidden;
   line-height: 1.5em;
   text-overflow: ellipsis;
  
`

const SubsButton = styled.button`
   background: none;
   border: none;
   color: #2a5885;
   font-weight: 400;
   padding: 0;
   align-self: start;
`

const PreloaderWrapper = styled.div`
  width: 110px;
  display: inline-block;
`