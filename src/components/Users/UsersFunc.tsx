import React, {useEffect} from 'react';
import UsersItem from "./UsersItem/UsersItem";
import Paginator from "../common/Paginator/Paginator";
import {UserType} from '../../Types/Types';
import {NavLink} from 'react-router-dom';
import styled, {keyframes} from "styled-components/macro";

type PropsType = {
    whatFriends: boolean | null
    isFetching: boolean
    allUsersCount: number
    friendsCount: number
    pageSize: number
    currentPage: number
    totalUsersCount: number
    users: Array<UserType>
    paginationSize: number
    followingInProgress: Array<number>
    followUser: (userId: number) => void
    unFollowUser: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number, whatUsers: boolean | null) => void
    getCurrentPageUsers: (pageNumber: number, pageSize: number, whatUsers: boolean | null) => void
    setPortionNumber: (number: number) => void

}

const UsersFunc: React.FC<PropsType> = (props) => {


    const onPageChanged = (pageNumber: number): void => {
        props.getCurrentPageUsers(pageNumber, props.pageSize, props.whatFriends)
    }

    useEffect(() => {
        onPageChanged(1)
        props.setPortionNumber(1)
    }, [props.whatFriends])

    useEffect(() => {
        props.getUsers(props.currentPage, props.pageSize, props.whatFriends)
    }, [props.currentPage])

    if (props.users.length === 0){
        const arr = []
        for (let i = 0; i < props.pageSize; i++){
            arr.push(i)
        }
        return (
            <>
                <UsersContainerPreloader>
                    <UsersHeaderPreloader/>
                    <PaginationContainerPreloader/>
                    {arr.map((item,index) => {
                       return <ItemContainerPreloader key={index}/>
                    })}
                    <PaginationContainerPreloader/>
                </UsersContainerPreloader>
            </>
        )
    }


    let userItem = () => {
        return props.users.map(u => <UsersItem
                isFetching={props.isFetching}
                followUser={props.followUser}
                unFollowUser={props.unFollowUser}
                followed={u.followed}
                photo={u.photos.small}
                key={u.id}
                name={u.name}
                status={u.status}
                id={u.id}
                followingInProgress={props.followingInProgress}
            />
        )
    }


    return (
        <UsersContainer>
            <UsersHeader>
                <NavLinkStyled exact to={'/users'}>
                    <HeaderUsersItem>
                        <p>Все пользователи:</p>
                        <span>{props.allUsersCount}</span>

                    </HeaderUsersItem>
                </NavLinkStyled>
                <NavLinkStyled exact to={'/users/friends'}>
                    <HeaderUsersItem>
                        <p>Ваши друзья:</p>
                        <span>{props.friendsCount}</span>
                    </HeaderUsersItem>
                </NavLinkStyled>
            </UsersHeader>
            {props.friendsCount!== 0 || props.users.length !== 0 ? <>
                {(props.totalUsersCount / props.pageSize) + 1 > 2 ?
                    <Paginator totalUsersCount={props.totalUsersCount}
                               pageSize={props.pageSize}
                               currentPage={props.currentPage}
                               onPageChanged={onPageChanged}
                               paginationSize={props.paginationSize}
                               setPortionNumber={props.setPortionNumber}
                    /> : null
                }
                <UsersWrapper>
                    {userItem()}
                </UsersWrapper>
                {(props.totalUsersCount / props.pageSize) + 1 > 2 ?
                    <Paginator totalUsersCount={props.totalUsersCount}
                               pageSize={props.pageSize}
                               currentPage={props.currentPage}
                               onPageChanged={onPageChanged}
                               paginationSize={props.paginationSize}
                               setPortionNumber={props.setPortionNumber}
                    /> : null
                }
            </> : <UsersWrapper><NavLink to={'/users'}>Пользователь еще не добавил друзей</NavLink></UsersWrapper>
            }

        </UsersContainer>
    )
};


export default UsersFunc;


const UsersContainer = styled.div`
  background-color: white;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
  border-radius: 4px;
 
`
const UsersWrapper = styled.ul`
  padding: 0 20px;
`

const UsersHeader = styled.ul`
  background-color: #fafbfc;
  border-bottom: 1px solid #e7e8ec;
  padding: 0 10px;
  margin: 0;
  display: flex;
`


const HeaderUsersItem = styled.li`
 padding: 18px 6px 20px;
 display: flex;
 p {
  margin-right: 6px;
 }
`

const NavLinkStyled = styled(NavLink)`
  color: #656565;
  margin-right: 10px;
  &.active {
    color: black;
    border-bottom: 2px solid #5181b8;
     :hover {
     border-bottom: 2px solid #5181b8;
    }
  }
    :hover {
    border-bottom: 2px solid #c5d0db
    }
`
// const Title = styled < { isActive: boolean } > Header`
//   color: ${(props) => (props.isActive ? props.theme.primaryColor : props.theme.secondaryColor)}
// `;


// Стили для Прелоудера

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

const UsersContainerPreloader = styled.div`
  background: linear-gradient(51deg, rgb(215,215,215) 0%, rgba(255,255,255,1) 20%, rgb(201,200,200) 100%); /* w3c */
  background-size: 450% 460%;
  animation: ${gradient} 1.5s linear infinite;;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
  border-radius: 4px;
 
`

const UsersHeaderPreloader = styled.ul`
  background: linear-gradient(51deg, rgb(215,215,215) 0%, rgba(255,255,255,1) 20%, rgb(201,200,200) 100%); /* w3c */
  background-size: 450% 460%;
  animation: ${gradient} 1.5s linear infinite;;
  border-bottom: 1px solid #e7e8ec;
  min-height: 56px;
  min-width: 785px ;
  padding: 0 10px;
  margin: 0;
  display: flex;
`
const ItemContainerPreloader = styled.div`
    background: linear-gradient(51deg, rgb(215,215,215) 0%, rgba(255,255,255,1) 20%, rgb(201,200,200) 100%); /* w3c */
    background-size: 450% 460%;
    animation: ${gradient} 1.5s linear infinite;;
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e7e8ec;
    min-height: 120px;
`

const PaginationContainerPreloader = styled.div`
  min-width: 785px;
  min-height: 61px;
  background: linear-gradient(51deg, rgb(215,215,215) 0%, rgba(255,255,255,1) 20%, rgb(201,200,200) 100%); /* w3c */
  background-size: 450% 460%;
  animation: ${gradient} 1.5s linear infinite;;
`