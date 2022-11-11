import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
}

const RQSuperHeroesPage = () => {
    const { data, isLoading, isError, error, isFetching } = useQuery(
        "super-heroes",
        fetchSuperHeroes,
        // { cacheTime: 5000 }, //default 5mins
        { staleTime: 30000 }, //default 0 //after 30seconds will fetch again the data 
        { refetchOnMount: true }, //default true //the query will REFETCH ON MOUNT if the data is STALE //if {refetchOnMount: "always"} even the data is not in STALE state if will fetch data 
        { refetchOnWindowFocus: true } //default true //every time that the tapgit/window is on focos the background refetch will be initiated //if {refetchOnWindowFocus: "always"} even the data is not in STALE state if will fetch data 
    );


    useEffect(() => {
        // console.log("RQSuperHeroesPage");
        // return () => {
        //     console.log("clean up RQSuperHeroesPage");
        // }
    }, []);

    console.log({ isLoading, isFetching })

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