import React, {useEffect, useRef, useState} from 'react';
import {useTransition, animated} from 'react-spring'
import {connect} from 'react-redux';
import {AppStateType} from "../../../../redux/redux-store";
import ProfileSide from "./ProfileSide";
import {addPost, deletePost} from "../../../../redux/Profile/profile-actions";
import {selectPosts, selectProfile} from '../../../../redux/Profile/profile-select';
import { ReactComponent as Exit } from "../../../../assets/images/close-cross.svg";
import {ProfileType} from "../../../../Types/Types";
import styled from "styled-components/macro";
import TooltipComponent from "../../../common/Tooltip/Tooltip";


type Posts = {
    id: number
    payload: string | object
    date: string
}

type MapStatePropsType = {
    posts: Array<Posts>
    profile: ProfileType | null
}

type MapDispatchPropsType = {
    addPost: (url: string,date: string) => void
    deletePost: (id: number) => void
}

type Props = MapStatePropsType & MapDispatchPropsType

const ProfileSideContainer: React.FC<Props> = (props) => {
    const [isAnimation, setAnimation] = useState(true);

    useEffect(() => {
        setAnimation(false)
    },[])

    const transitions = useTransition(props.posts, (item: any) => item.id, {
        immediate: isAnimation,
        from: { transform: 'translate3d(0,-40px,0)' },
        enter: { transform: 'translate3d(0,0px,0)' },
        leave: { transform: 'translate3d(0,-40px,0)' },
    })


    const createInfo = (item: any) => {
                return (
                    <>
                        {item.payload.message ? <PostMessage>{item.payload.message}</PostMessage> : null}
                        {item.payload.file ? <PostImg src={URL.createObjectURL(item.payload.file)}/> : null}
                        {item.payload.images ? <PostImg src={item.payload.images}/> : null}
                    </>
                )

    }


    return (
        <>
            <ProfileSide {...props}/>
            {transitions.map((item: any) => {
                return (
                    <animated.div style={item.props} key={item.key}>
                        <PostContent>
                            <PostHeader>
                                <Info>
                                    <ImgWrapper>
                                        <img src={props.profile?.photos.small as string | undefined} alt="#"/>
                                    </ImgWrapper>
                                    <InfoDateName>
                                            <h3>{props.profile?.fullName}</h3>
                                            <time>{item.item.date}</time>
                                    </InfoDateName>
                                </Info>
                                <PostHeaderInfo>
                                    <SvgWrapper onClick={() => {props.deletePost(item.item.id)}}>
                                        <TooltipComponent place={'top'} margin={'5'} text="Удалить">
                                            <Icon/>
                                        </TooltipComponent>
                                    </SvgWrapper>
                                </PostHeaderInfo>
                            </PostHeader>
                            {
                                createInfo(item.item)
                            }
                        </PostContent>
                    </animated.div>
                )
            })}
        </>

    );
};


const MapStateToProps = (state: AppStateType): MapStatePropsType => ({
    posts: selectPosts(state),
    profile: selectProfile(state)
})

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(MapStateToProps, {addPost,deletePost})(ProfileSideContainer);


const PostContent = styled.div`
  background-color: white;
  box-shadow: 0 1px 0 0 #d3d9de,0 0 0 1px #e7e8ec;
  border-radius: 4px;
  margin-bottom: 25px;
  padding: 20px;
`

const PostImg = styled.img`
  width: 100%;
  border: 1px solid #e7e8ec;
  border-radius: 4px;
`

const PostHeader = styled.div`
display: flex;
margin-bottom: 20px;
`

const InfoDateName = styled.div`
 max-width: 100%;
 min-width: 10px;
     h3 {
         font-weight: 600;
         color: #2a5885;
         overflow: hidden;
         text-overflow: ellipsis;
     }
     time {
          display: inline-block;
          margin-top: 5px;
          color: #939393;
     }
`

const ImgWrapper = styled.div`
  margin-right: 10px;
  height: 100%;
    img {
        border-radius: 50%;
        width: 40px;
    }
`

const PostHeaderInfo = styled.div`
margin-left: auto;
`

const Info = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
`

const SvgWrapper = styled.div<any>`
  width: 10px;
`
const Icon = styled(Exit)`
  fill: #cecaca;
  width: 100%;
  height: 100%;
  
`

const PostMessage = styled.p`
  word-break: break-all;
  margin-bottom: 10px;
`
