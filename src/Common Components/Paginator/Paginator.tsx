import React from 'react';
import styles from "../../Common Components/Paginator/Paginator.module.css";

export type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

let Paginator: React.FC<PropsType> = ({
                                          totalUsersCount,
                                          pageSize,
                                          currentPage,
                                          onPageChanged
                                      }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(p => {
            return <span className={currentPage === p ? styles.selectedPage : ''}
                         onClick={() => {
                             onPageChanged(p)
                         }}>{p} </span>
        })}
    </div>
}

export default Paginator;