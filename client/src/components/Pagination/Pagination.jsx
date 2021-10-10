import styles from './Pagination.module.css'

export default function Pagination({dogsPerPage, allDogs, pagination, currentPage}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className={styles.crumbs}>
                {
                    pageNumbers&&
                    pageNumbers.map(number => (
                        <li className={styles.number} key={number}>
                            <div className={currentPage === number ? styles.crumb__active : styles.crumb} onClick={()=> pagination(number)}>{number}</div>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};
