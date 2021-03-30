import React from 'react';
import classes from "./Paginator.module.css";
import cn from 'classnames'
import styled from "styled-components/macro";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    paginationSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    setPortionNumber: (number: number) => void
}


const Paginator: React.FC<PropsType> = (props) => {
    const portionNumber = useSelector((state: AppStateType) => state.usersPage.portionNumber)

    let pagesCount = Math.ceil (props.totalUsersCount / props.pageSize)
    let pages = [] as Array<number>;
    for (let i = 1; i <= pagesCount; i++) {
        pages.push (i)
    }

    const leftBorderPagination = (portionNumber - 1) * props.paginationSize + 1
    const rightBorderPagination = props.paginationSize * portionNumber

    // const portionCount = Math.ceil (pagesCount / props.paginationSize)

    return (
        <PaginationContainer>
            <Pages>
                <PaginationButton disabled={portionNumber === 1} onClick={() => {
                    props.setPortionNumber(portionNumber - 1)
                    props.onPageChanged (leftBorderPagination - 1)
                }}>«</PaginationButton>
                <PagesItem>
                {
                    pages.slice (leftBorderPagination - 1, rightBorderPagination)
                        .map ((p,index) => <div
                             key={index}
                             className={cn({[classes.selected]: props.currentPage === p})}
                             onClick={() => {
                                props.onPageChanged (p)
                            }}>{p}</div>)
                }
                </PagesItem>
                 <PaginationButton disabled={rightBorderPagination > pages.length} onClick={() => {
                     props.setPortionNumber(portionNumber + 1)
                    props.onPageChanged (rightBorderPagination + 1)
                }}>»</PaginationButton>
            </Pages>
        </PaginationContainer>
    );
};

export default Paginator;

const PaginationContainer = styled.div`
  display: flex;
`

const Pages = styled.div`
    display: flex;
    margin: 0 auto;
`

const PagesItem = styled.div`
    display: flex;
    padding: 10px 0;
    cursor: pointer;
     div {
       padding: 10px;
       border-left: 1px solid #e7e8ec;
       border-top: 1px solid #e7e8ec;
       border-bottom: 1px solid #e7e8ec;
    }
    div:first-child {
      border-left: none;
    }
`

const PaginationButton = styled.button`
    background: none;
    border: 1px solid #e7e8ec;
    border-radius: 2px;
    margin: 10px 0;
    padding: 10px;
`
