import React from "react";

export default function Pagination({dogsPerPage, allDogs, pagination}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className='pagination'>
                {
                    pageNumbers&&
                    pageNumbers.map(number => (
                        <li className='number' key={number}>
                            <a href="##" onClick={()=> pagination(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};
