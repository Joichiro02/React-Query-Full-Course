import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RQSuperHeroesPage = () => {
    useEffect(() => {
        // console.log("RQSuperHeroesPage");
        // return () => {
        //     console.log("clean up RQSuperHeroesPage");
        // }
    }, []);

    return (
        <h2 className='rq-super-heroes'>RQSuperHeroesPage</h2>
    )
}

export default RQSuperHeroesPage