import React from 'react'
import { useSuperHeroesData } from '../hooks/useSuperHeroesData'

const AlterEgo = () => {
    const filterAlterEgo = (data) => {
        const alterEgo = data.data.map(item => item.alterEgo);
        return alterEgo;
    }
    const { data, isLoading, isError, error, isFetching, refetch } = useSuperHeroesData({ select: filterAlterEgo, enabled: false });

    if (isLoading || isFetching) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    return (
        <>
            <h2 className='alter-ego'>AlterEgo</h2>
            <button onClick={refetch}>Fetch Alter Ego</button>
            {
                data?.map(alterEgo => (
                    <div key={alterEgo}>{alterEgo}</div>
                ))
            }
        </>
    )
}

export default AlterEgo