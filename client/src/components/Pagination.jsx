import styles from './Pagination.module.css'

export default function Pagination({dogsPerPage, allDogs, pagination}) {
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
                            <a className={styles.crumb} href="##" onClick={()=> pagination(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};
