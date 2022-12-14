import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";
// import axios from 'axios';

const fetchSuperHeroes = () => {
    // return axios.get("http://localhost:4000/superheroes");
    return request({ url: "/superheroes" });
}

const addSuperHero = (hero) => {
    // return axios.post("http://localhost:4000/superheroes", hero);
    return request({ url: "superheroes", method: "post", data: hero })
}

export const useSuperHeroesData = (options = null) => {
    return useQuery(
        "super-heroes",
        fetchSuperHeroes,
        // { cacheTime: 5000 }, //default 5mins
        // { staleTime: 30000 }, //default 0 //after 30seconds will fetch again the data 
        // { refetchOnMount: true }, //default true //the query will REFETCH ON MOUNT if the data is STALE //if {refetchOnMount: "always"} even the data is not in STALE state if will fetch data 
        // { refetchOnWindowFocus: true }, //default true //every time that the tapgit/window is on focos the background refetch will be initiated //if {refetchOnWindowFocus: "always"} even the data is not in STALE state if will fetch data 
        // { refetchInterval: true }, //default false // this is fetch data infinite it use for the website that need to display data every single time, if the value is true every time that the browser is in focus it will fetch data // {refetchInterval: 2000} can use time, that means if the value is 2seconds, every 2seconds it will fetch data
        // { refetchIntervalInBackground: false }, //it will continue to pull data even the browser in not focus
        // { enabled: true } //default true //this will not fetch automatically the data, its need to be trigger the "refetch" that's why it put in onClick 
        // {
        //     onSuccess: onSuccess, // a callback that return a message if the fetching is successful
        //     onError: onError, // a callback that return a message if the fetching is encounter an error
        //     select: (data) => { // manipulate the data that have been fetch and tranform it to new form
        //         const superHeroes = data.data.map(hero => hero.name);
        //         return superHeroes;
        //     }
        // },
        options
    )
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation(addSuperHero, {
        // onSuccess: () => { // if the posting is successful, the "super-heroes" will be background refetch to reflect the changes
        //     queryClient.invalidateQueries("super-heroes");
        // }

        // onSuccess: (data) => { // no need to refetch the "super-heroes" it just update the super-heroes cache by merging the return data when post the hero, by using the setQueryData
        //     queryClient.setQueryData("super-heroes", (oldQueryData) => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data]
        //         }
        //     })
        // }

        onMutate: async (newHero) => {
            await queryClient.cancelQueries("super-heroes");
            const previousHeroData = queryClient.getQueryData("super-heroes");
            queryClient.setQueryData("super-heroes", (oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, { id: oldQueryData?.data?.length + 1, ...newHero }]
                }
            })
            return {
                previousHeroData
            }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData("super-heroes", context.previousHeroData)
        },
        onSettled: () => {
            queryClient.invalidateQueries("super-heroes")
        }
    })
}