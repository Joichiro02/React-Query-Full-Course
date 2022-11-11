import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroesa");
}

const RQSuperHeroesPage = () => {
    const { data, isLoading, isError, error } = useQuery("super-heroes", fetchSuperHeroes);


    useEffect(() => {
        // console.log("RQSuperHeroesPage");
        // return () => {
        //     console.log("clean up RQSuperHeroesPage");
        // }
    }, []);

    if (isLoading) return <h2>Loading...</h2>
    if (isError) return <h2>{error.message}</h2>

    return (
        <>
            <h2 className='rq-super-heroes'>RQ Super Heroes Page</h2>
            {
                data?.data.map(hero => (
                    <div key={hero.name}>{hero.name}</div>
                ))
            }
        </>
    )
}

export default RQSuperHeroesPage