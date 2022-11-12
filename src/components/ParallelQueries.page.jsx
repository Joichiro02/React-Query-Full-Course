import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes")
}
const fetchFriends = () => {
    return axios.get("http://localhost:4000/friends")
}

const ParallelQueriesPage = () => {
    const { data: superHeroes } = useQuery("superHeroes", fetchSuperHeroes);
    const { data: friends } = useQuery("friends", fetchFriends);
    console.log(superHeroes, friends)
    return (
        <>
            <h2 className='rq-parallel'>ParallelQueriesPage</h2>
            <h3>Super Heroes</h3>
            {
                superHeroes?.data.map(hero => (
                    <div key={hero.id}>{hero.name}</div>
                ))
            }
            <h3>Friends</h3>
            {
                friends?.data.map(friend => (
                    <div key={friend.id}>{friend.name}</div>
                ))
            }
        </>
    )
}

export default ParallelQueriesPage