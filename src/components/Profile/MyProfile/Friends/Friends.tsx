import React, {useEffect} from 'react';
import styled from "styled-components/macro";
import {UserType} from "../../../../Types/Types";
import user from '../../../../assets/images/user.png'
import {NavLink} from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppStateType} from '../../../../redux/redux-store';
import Preloader from "../../../Preloader/Preloader";


type PropsType = {
    randomFriends: Array<UserType>
    friendsCount: number
    getRandomFriends: () => void
}
const Friends: React.FC<PropsType> = (props) => {
    const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching)
    console.log(props.friendsCount)

    useEffect(() => {
        props.getRandomFriends()
    }, [props.friendsCount])

    return (
        <FriendsContainer>
            {!isFetching  ? <>
                {props.friendsCount !== 0 ? <>
                    <FriendsHeader to={'/users/friends'}>
                        <p>Друзья:</p>
                        <span>{props.friendsCount}</span>
                    </FriendsHeader>
                    <FriendsWrapper>
                        {props.randomFriends.map(item => {
                            return <FriendsItem key={item.id} to={`/profile/${item.id}`}>
                                <FriendsImg>
                                    <img src={item.photos.small ? item.photos.small : user} alt=""/>
                                </FriendsImg>
                                <FriendsName>
                                    <p>{item.name.length > 6 ? item.name.substr(0, 6) + '...' : item.name}</p>
                                </FriendsName>
                            </FriendsItem>
                        })}
                    </FriendsWrapper>
                </> : <NoUsers>Пользователь еще не добавил друзей</NoUsers>
                }
            </> :<PreloaderWrapper><Preloader/></PreloaderWrapper>
            }
        </FriendsContainer>
    );
};

export default Friends;

const FriendsContainer = styled.div`
  background-color: white;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
  border-radius: 4px;
  margin-top: 10px;
  text-align: center;
  min-width: 258px;
  min-height: 158px;

`

const FriendsHeader = styled(NavLink)`
   display: flex;
   font-size: 15px;
   line-height: 1.1em;
   font-weight: 400;
   padding: 10px 15px 0 15px;
   color: black;
  span {
    color: #939393;
    margin-left: 5px; 
  }
`

const FriendsWrapper = styled.div`
  display: grid;
  grid-template-columns:  repeat(3,1fr);
  gap: 15px;
  padding: 15px 15px;
`

const FriendsItem = styled(NavLink)`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
cursor: pointer;
  
`
const FriendsImg = styled.div`
  width: 40px;
  height: 40px;
  img {
    border-radius: 50%;
    width: 100%;
  }
`

const FriendsName = styled.div`
  font-size: 14px;
  margin-top: 5px;
  color: #2a5885;
`

const NoUsers = styled.p`
  padding: 15px;
  font-style: italic;
`

const PreloaderWrapper = styled.div`
  width: 50px;
  display: inline-block;
`
