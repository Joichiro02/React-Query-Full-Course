import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';

const fetchUserByEmail = ({ queryKey }) => {
    const email = queryKey[1];
    return axios.get(`http://localhost:4000/users/${email}`);
}

const fetchCoursesByChannelId = ({ queryKey }) => {
    const channelId = queryKey[1];
    return axios.get(`http://localhost:4000/channels/${channelId}`);
}

const DependentQueriesPage = ({ email }) => {
    const { data: user } = useQuery(["user", email], fetchUserByEmail); // fetch first the email to get the channelId
    const channelId = user?.data.channelId; // get the channel Id
    const { data: courses } = useQuery(["courses", channelId], fetchCoursesByChannelId, {// fetch the channel to get the courses
        enabled: !!channelId, // if the channelId is undifined it will converted to false and it will not fetching, and if the channelId have a value it will became true it will now fetching
    });
    console.log(courses?.data)
    return (
        <>
            <h2 className='rq-dependent'>Dependent Queries Page</h2>
            <h3>Courses</h3>
            {
                courses?.data.courses.map(course => (
                    <div key={course}>{course}</div>
                ))
            }
        </>
    )
}

export default DependentQueriesPage