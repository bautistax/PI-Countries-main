import React from "react";
import './Pagination.css';

const Pagination = ({ totalCards, cardsPerPage, setCurrentPage }) => {
    let pages = [];
    for(let i=1; i<=Math.ceil(totalCards / cardsPerPage); i++){
        pages.push(i);
    }
    return (
        <div className="pagination">
            {pages.map((page,i)=>{
                return (
                    <button key={i} onClick={()=> setCurrentPage(page)}>{page}</button>
                )
            })}
        </div>
    )
}

export default Pagination;