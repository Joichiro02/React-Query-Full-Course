import axios from 'axios'
import React, { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query';

const fetchColors = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
}

const InfiniteQueriesPage = () => {
    const { data: colors, isError, isLoading, error, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery("colors", fetchColors, {
        getNextPageParam: (_lastPage, pages) => {
            if (pages.length < 4) {
                return pages.length + 1;
            }
            else {
                return undefined;
            }
        }
    });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>{error.message}</div>

    return (
        <>
            <div>
                <h2 className="rq-infinite">InfiniteQueriesPage</h2>
                {colors?.pages.map((group, index) => (
                    <Fragment key={index}>
                        {
                            group.data.map(color => (
                                <h2 key={color.id}>{color.id} - {color.label}</h2>
                            ))
                        }
                    </Fragment>
                ))}
            </div>
            <div>
                <button disabled={!hasNextPage} onClick={fetchNextPage}>Load more</button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        </>
    )
}

export default InfiniteQueriesPage