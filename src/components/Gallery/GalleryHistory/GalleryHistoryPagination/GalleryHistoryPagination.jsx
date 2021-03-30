import React, {useEffect, useState} from 'react';
import styled from "styled-components/macro";

const GalleryHistoryPagination = ({historyArr, pageSize, currentPage, setCurrentPages,rightBorderPageSize,leftBorderPageSize}) => {
    let [paginationCount, setPaginationCount] = useState(1)
    console.log (paginationCount)
    useEffect(() => {
        if (historyArr.slice (leftBorderPageSize, rightBorderPageSize).length === 0 && historyArr.length !== 0) {
            setCurrentPages(currentPage - 1)
            if (currentPage === leftBorderPagination) {
                setPaginationCount(paginationCount - 1)
            }
        }
    })
    let pagesCount = Math.ceil (historyArr.length / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const paginationSize = 3;
    const leftBorderPagination = (paginationCount - 1) * paginationSize + 1
    const rightBorderPagination = paginationCount * paginationSize
    console.log (rightBorderPagination, pages.length)

    return (
        historyArr.length > pageSize ?
        <PaginationContainer>
            <Pages>
                <PaginationButton disabled={paginationCount === 1}
                                  onClick={() => {setCurrentPages(leftBorderPagination - 1)
                                      setPaginationCount(paginationCount - 1)}}>«
                </PaginationButton>
                <PagesItems>
                    {
                        pages.slice (leftBorderPagination - 1, rightBorderPagination)
                            .map ((p, index) => <PagesItem key={index} currentPage={currentPage} p={p} onClick={() => {
                                setCurrentPages(p)
                            }}>{p}</PagesItem>)
                    }
                </PagesItems>
                <PaginationButton
                    disabled={!(rightBorderPagination < pages.length)}
                    onClick={() => {
                    setCurrentPages(rightBorderPagination + 1)
                    setPaginationCount(paginationCount + 1)}}
                >
                    »
                </PaginationButton>
            </Pages>
        </PaginationContainer> : null
    );
};

export default GalleryHistoryPagination;


const PaginationContainer = styled.div`
  display: flex;
`

const Pages = styled.div`
    display: flex;
    margin: 0 auto;
`

const PagesItems = styled.div`
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

const PagesItem = styled.div`
  font-weight: ${props => props.currentPage === props.p ? 'bold' : 'inherit'};
  transition: font-weight, transform 0.2s ease-in-out;
`

const PaginationButton = styled.button`
    background: none;
    border: 1px solid #e7e8ec;
    border-radius: 2px;
    margin: 10px 0;
    padding: 10px;
`