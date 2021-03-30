import React, {useRef, useState} from 'react'
import {NavLink} from "react-router-dom";
import ArrowSvg from "../../assets/images/arrowSvg";
import styled, {keyframes} from "styled-components/macro"
import {CSSTransition} from 'react-transition-group';


type PropsType = {
    isAuth: boolean
    login: string | null
    loginOut: () => void
    photoSmall: string | undefined | null
}
const transitionName = `example`;

const Header: React.FC<PropsType> = ({isAuth, login, loginOut, photoSmall}) => {


    const [isOpenModal, setOpenModal] = useState(false)
    const ref = useRef<HTMLUListElement>(null);
    const loginBlockRef = useRef<HTMLDivElement>(null)


    const handleClickOutside = (event: MouseEvent): void => {
        if (ref.current && !ref.current.contains(event.target as Node) && !loginBlockRef.current!.contains(event.target as Node)) {
            setOpenModal(false);
            document.removeEventListener('click', handleClickOutside, true);

        }

    };


    const hadleClickDropDown = () => {
        if (isAuth) {
            setOpenModal(!isOpenModal)
            document.addEventListener('click', handleClickOutside, true);
        }
    }


    return (
        <>
            <HeaderWrapper>
                <Container>
                    <Logo src="https://vk.com/images/svg_icons/ic_head_logo.svg" alt="#"/>
                    <LoginWrapper onClick={hadleClickDropDown}>
                        {
                            isAuth ?
                                <LoginTrue ref={loginBlockRef}>
                                    <LoginName>{login}</LoginName>
                                    {photoSmall && <LoginPhotoSmall src={photoSmall} alt="#"/>}
                                    <ArrowSvgWrapper><ArrowSvg height='11' width='11' fill='white'/></ArrowSvgWrapper>
                                </LoginTrue> :
                                <LoginFalse><NavLink to={'/login'}>Login</NavLink></LoginFalse>
                        }


                        <CSSTransition in={isOpenModal} classNames={transitionName} timeout={300} mountOnEnter unmountOnExit>
                            <DropDownWrapper ref={ref}>
                                <DropDownItem onClick={() => loginOut()}><a href="#">Выйти</a></DropDownItem>
                            </DropDownWrapper>
                        </CSSTransition>


                    </LoginWrapper>
                </Container>
            </HeaderWrapper>
        </>

    )
}


export default Header


const HeaderWrapper = styled.header`
  background-color: #4974a5;
  height: 100%;
  padding: 0px 5px;
`

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
 
`

const Logo = styled.img`
   width: 50px;
`

const LoginWrapper = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 25px;
  height: 100%;
  display: flex;
  align-items: center;
 
`

const LoginTrue = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 5px 5px;
  min-height: 50px;
  
  :hover {
  background-color: rgba(0,20,51,.12);

  }
`

const LoginName = styled.span`
  cursor: pointer;
`

const LoginPhotoSmall = styled.img`
  width: 40px;
  border-radius: 50%;
  margin-left: 10px;
`

const LoginFalse = styled.div`
  padding: 12.5px 0;
  min-height: 50px;
  a {
  color: white;
  }
`


const translateYtrue = keyframes`
  from {
    transform: translateY(0);
    opacity: 0;
  }
  to {
    transform: translateY(5px);
    opacity: 1;
  }
`
const translateYfalse = keyframes`
    to {
    transform: translateY(-10px);
      }
  from {
    transform: translateY(100px);
  }
`
const rotate = keyframes`
  0% {
      transform: rotate(0);
      
  }
  100% {
    transform: rotate(360deg) 
  
  }
`


const DropDownWrapper = styled.ul`
  position: absolute;
  background-color: #fff;
  border: 1px solid #c5d0db;
  padding: 4px 0;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.8);
  min-width: 206px;
  max-width: 230px;
  width: auto;
  right: 10px;
  top: 60px;
   &.${transitionName}-exit-active{animation: ${rotate} 0.3s linear reverse};
   &.${transitionName}-enter-active{animation: ${translateYtrue} 0.2s forwards}  ;
   
             
  :before {
      position: absolute;
      pointer-events: none;
      content: '';
      height: 0;
      width: 0;
      bottom: 100%;
      margin: 0 -6px;
      right: 42px;
      border: 6px solid transparent;
      border-bottom: 6px solid #fff;
  }
`

const DropDownItem = styled.li`
 padding: 0 15px;
 :hover {
      background-color: #e5ebf1;
 }
 a {
      color: #2a5885;
      font-size: 14px;
      font-weight: 500;
      line-height: 30px;
 }
`

const ArrowSvgWrapper = styled.div`
  margin-left: 10px;
`

