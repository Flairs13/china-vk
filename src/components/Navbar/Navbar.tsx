import React from 'react'
import {NavLink} from "react-router-dom";
import styled from "styled-components/macro";
import ProfileSvg from "../SVG-Components/ProfileSvg";
import MessageSvg from "../SVG-Components/MessageSvg";
import NewsSvg from "../SVG-Components/NewsSvg";
import HistorySvg from "../SVG-Components/HistorySvg";
import UsersSvg from "../SVG-Components/UsersSvg";
import {useSelector} from "react-redux";
import {isAuthSelect} from "../../redux/Auth/auth-select";


type  Props = {

}
const Navbar:React.FC<Props> = (props) => {

    const isAuth = useSelector(isAuthSelect)
    console.log('renderNavbar')

    return ( isAuth ?
        <NavWrapper>
            <ListWrapper>
                <li>
                    <NavLinkStyled to="/profile">
                        <HomePageSvg>
                            <ProfileSvg height={'100%'} width={'100%'} fill={'#9ab1c6'}/>
                        </HomePageSvg>
                        <div><span>Профиль</span></div>
                    </NavLinkStyled>

                </li>
                <li>
                    <NavLinkStyled to="/dialogs">
                        <HomePageSvg>
                            <MessageSvg height={'100%'} width={'100%'} fill={'#9ab1c6'}/>
                        </HomePageSvg>
                        <span>Сообщения</span>
                    </NavLinkStyled>
                </li>
                <li>
                    <NavLinkStyled to="/news">
                        <HomePageSvg>
                            <NewsSvg height={'100%'} width={'100%'} fill={'#9ab1c6'}/>
                        </HomePageSvg>
                        <span>Новости</span>
                    </NavLinkStyled>
                </li>
                <li>
                    <NavLinkStyled to="/history">
                        <HomePageSvg>
                            <HistorySvg height={'100%'} width={'100%'} fill={'#9ab1c6'}/>
                        </HomePageSvg>
                        <span>История</span>
                    </NavLinkStyled>
                </li>
                <li>
                    <NavLinkStyled to="/users">
                        <HomePageSvg>
                            <UsersSvg height={'100%'} width={'100%'} fill={'#9ab1c6'}/>
                        </HomePageSvg>
                        <span>Пользователи</span>
                    </NavLinkStyled>
                </li>
            </ListWrapper>
        </NavWrapper>
       : null)
}

export default Navbar


const NavWrapper = styled.nav`
    grid-area: n;
    border-radius: 5px;
    text-decoration: none;
    height: 100%;
    a {
        text-decoration: none;
        color: #2a5885;
        font-weight: 400;
    }
`

const ListWrapper = styled.ul`
  li {
    margin-bottom: 15px;
    cursor: pointer;
    border-radius: 3px;
    padding: 5px;
  }
  li:hover {
    background-color: #d3d9de;
  }
  
  li:last-child {
    margin-bottom: 0;
    margin-top: 80px;
  }
`

const HomePageSvg = styled.div`
  width: 18px;
  margin-right: 10px;
`

const NavLinkStyled = styled (NavLink)`
height: 100%;
width: 100%;
display: flex;
align-items: center;
&.active{
color: #1e7fea;
}

`
  
