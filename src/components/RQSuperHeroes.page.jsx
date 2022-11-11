import React, { useEffect } from 'react';
import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

const RQSuperHeroesPage = () => {
    const onSuccess = (data) => {
        console.log("Perform side effect after data fetching", data);
    }
    const onError = (error) => {
        console.log("Perform side effect after encountering error", error);
    }
    const { data, isLoading, isError, error, isFetching, refetch } = useSuperHeroesData({ onSuccess, onError });

    useEffect(() => {
        // console.log("RQSuperHeroesPage");
        // return () => {
        //     console.log("clean up RQSuperHeroesPage");
        // }
    }, []);

    console.log({ isLoading, isFetching })

    if (isLoading || isFetching) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    return (
        <>
            <h2 className='rq-super-heroes'>RQ Super Heroes Page</h2>
            <button onClick={refetch}>Fetch Heros</button>
            {
                data?.data.map(hero => (
                    <div key={hero.name}>{hero.name}</div>
                ))
            }
            {/* {
                data.map(heroName => (
                    <div key={heroName}>{heroName}</div>
                ))
            } */}
        </>
    )
}

export default RQSuperHeroesPage