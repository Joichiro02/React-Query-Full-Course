import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SuperHeroesPage = () => {
    const [isLoading, setisLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        // console.log("SuperHeroesPage");
        // return () => {
        //     console.log("clean up SuperHeroesPage");
        // }
        axios.get("http://localhost:4000/superheroes")
            .then(res => {
                setData(res.data);
                setisLoading(false);
            })
    }, []);

    if (isLoading) return <h2>Loading...</h2>

    return (
        <>
            <h2 className='rq-super-heroes'>RQSuperHeroesPage</h2>
            {data.map(hero => (
                <div key={hero.name}>{hero.name}</div>
            ))}
        </>
    )
}

export default SuperHeroesPage