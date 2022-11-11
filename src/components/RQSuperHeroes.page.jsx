import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
}

const RQSuperHeroesPage = () => {
    const { data, isLoading } = useQuery("super-heroes", fetchSuperHeroes);


    useEffect(() => {
        // console.log("RQSuperHeroesPage");
        // return () => {
        //     console.log("clean up RQSuperHeroesPage");
        // }
    }, []);

    if (isLoading) return <h2>Loading...</h2>

    return (
        <>
            <h2 className='rq-super-heroes'>RQSuperHeroesPage</h2>
            {
                data?.data.map(hero => (
                    <div key={hero.name}>{hero.name}</div>
                ))
            }
        </>
    )
}

export default RQSuperHeroesPage