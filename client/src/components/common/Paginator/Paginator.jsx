import React, { useState } from 'react';
import styles from "./paginator.module.css";
import cn from "classnames";

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize=10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);//к-во порций (частей с цифрами)
    let [portionNumber, setPortionNumber] = useState(1); //по умолчанию открывается первая порция
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; //крайний левый элемент
    let rightPortionPageNumber = portionNumber * portionSize;//крайний правый элемент

    return <div className={styles.paginator}>
        { portionNumber > 1 &&
        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button> }

            {pages
            // проверка, входит ли число в диапазон от leftPortion до rightPortion
            .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber) 
            .map(p => {
                return <span className={ cn({
                    [styles.selectedPage]: currentPage === p
                }, styles.pageNumber) }
                             key={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
            {/* //     return <span className={currentPage === p && styles.selectedPage}
            //                  onClick={(e) => {
            //                      onPageChanged(p);
            //                  }}>{p}</span>
            // })} */}
             { portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }
        </div>
}

export default Paginator; 