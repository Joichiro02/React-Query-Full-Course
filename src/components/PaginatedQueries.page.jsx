import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

const fetchColors = ({ queryKey }) => {
    const pageNumber = queryKey[1];
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}

const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const { data: colors, isError, isLoading, error, isFetching } = useQuery(["colors", pageNumber], fetchColors, { keepPreviousData: true });
    if (isLoading || isFetching) return <div>Loading...</div>
    if (isError) return <div>{error.message}</div>
    return (
        <>
            <div>
                <h2 className='rq-pagination'>PaginatedQueriesPage</h2>
                {
                    colors?.data.map(color => (
                        <div key={color.id}>{color.label}</div>
                    ))
                }
            </div>
            <div>
                <button onClick={() => setPageNumber(page => page - 1)} disabled={pageNumber === 1}>Prev</button>
                <button onClick={() => setPageNumber(page => page + 1)} disabled={pageNumber === 4}>Next</button>
            </div>
        </>
    )
}

export default PaginatedQueriesPage