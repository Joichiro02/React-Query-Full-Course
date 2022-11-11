import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
}

const RQSuperHeroesPage = () => {
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
        "super-heroes",
        fetchSuperHeroes,
        // { cacheTime: 5000 }, //default 5mins
        // { staleTime: 30000 }, //default 0 //after 30seconds will fetch again the data 
        // { refetchOnMount: true }, //default true //the query will REFETCH ON MOUNT if the data is STALE //if {refetchOnMount: "always"} even the data is not in STALE state if will fetch data 
        // { refetchOnWindowFocus: true }, //default true //every time that the tapgit/window is on focos the background refetch will be initiated //if {refetchOnWindowFocus: "always"} even the data is not in STALE state if will fetch data 
        // { refetchInterval: true }, //default false // this is fetch data infinite it use for the website that need to display data every single time, if the value is true every time that the browser is in focus it will fetch data // {refetchInterval: 2000} can use time, that means if the value is 2seconds, every 2seconds it will fetch data
        // { refetchIntervalInBackground: false }, //it will continue to pull data even the browser in not focus
        { enabled: true } //default true //this will not fetch automatically the data, its need to be trigger the "refetch" that's why it put in onClick 
    );


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
        </>
    )
}

export default RQSuperHeroesPage