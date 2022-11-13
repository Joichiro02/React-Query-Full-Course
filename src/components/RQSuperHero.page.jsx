import React from 'react';
import { useParams } from "react-router-dom";
import { useSuperHeroData } from '../hooks/userSuperHeroData';

const RQSuperHeroPage = () => {
    const { heroId } = useParams();
    const { data, isLoading, isError, error, isFetching } = useSuperHeroData(heroId);

    console.log(isLoading, isFetching)
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error.message}</div>;
    return (
        <>
            <h2 className='rq-super-hero'>RQ Super Hero Page</h2>
            <div>
                {data?.data.name} - {data?.data.alterEgo}
            </div>
        </>
    )
}

export default RQSuperHeroPage