import axios from "axios"
import { useQueries } from "react-query";

/*
    This is use when have a multiple id's need to be fetch like array of id's
*/

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export const DynamicParallelPage = ({ heroIds }) => {
    const queryResult = useQueries( // this will return array of results
        heroIds.map(id => {
            return {
                queryKey: ["super-hero", id],
                queryFn: () => fetchSuperHero(id)
            }
        })
    )
    console.log(queryResult);
    return (
        <>
            <h2 className="rq-dynamic-parallel">Dynamic Parallel Page</h2>
            {
                queryResult.map(result => (
                    result.data && <div key={result.data.data.id}>{result.data.data.name}</div>
                ))
            }
        </>
    )
}