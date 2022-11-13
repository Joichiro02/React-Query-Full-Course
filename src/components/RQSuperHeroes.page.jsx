import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAddSuperHeroData, useSuperHeroesData } from '../hooks/useSuperHeroesData';

const RQSuperHeroesPage = () => {
    const [name, setName] = useState("");
    const [alterEgo, setAlterEgo] = useState("");

    const onSuccess = (data) => {
        console.log("Perform side effect after data fetching", data);
    }
    const onError = (error) => {
        console.log("Perform side effect after encountering error", error);
    }
    const { data, isLoading, isError, error, isFetching, refetch } = useSuperHeroesData({ onSuccess, onError });
    const { mutate: addHero, isLoading: isAddHeroLoading, isError: isAddHeroError, error: addHeroError } = useAddSuperHeroData();

    const handleAddHeroClick = () => {
        const hero = { name, alterEgo };
        addHero(hero)
    }

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
            <div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
                <button onClick={handleAddHeroClick}>Add Hero</button>
            </div>
            <button onClick={refetch}>Fetch Heros</button>
            {
                data?.data.map(hero => (
                    <div key={hero.name}>
                        <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
                    </div>
                ))
            }
            {/* {
                data?.data.map(hero => (
                    <div key={hero.name}>{hero.name}</div>
                ))
            } */}
            {/* {
                data.map(heroName => (
                    <div key={heroName}>{heroName}</div>
                ))
            } */}
        </>
    )
}

export default RQSuperHeroesPage