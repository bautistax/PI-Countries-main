import React from "react";
import './Pagination.css';
import { useSelector, useDispatch } from "react-redux";
import { getPages } from "../../redux/actions";

const Pagination = ({ countriesSorted, cardsPerPage}) => {
    const currentPage = useSelector(state => state.paginated);
    const dispatch = useDispatch();

    let pages = [];

    for(let i=1; i < Math.ceil(countriesSorted / cardsPerPage); i++){
        pages.push(i);
    };

    return (
        // <div className="pagination">
        //     {pages.map((page,i)=>{
        //         return (
        //             <button key={i} onClick={()=> setCurrentPage(page)}>{page}</button>
        //         )
        //     })}
        // </div>
         
            <div className="pagination">
                <div className="pagination">
                    {
                        currentPage === 1 ?
                            <button ></button> :
                            <button  onClick={() => dispatch(getPages(currentPage - 1))}>{"<"}</button>
                    }
                </div>
                <div className="pagination">
                    <button >{currentPage}</button>
                </div>
                <div className="pagination">
                    {
                        currentPage === pages.length ?
                            <button ></button> :
                            <button  onClick={() => dispatch(getPages(currentPage + 1))}>{">"}</button>
                    }
                </div>
            </div>
    )
};

export default Pagination;