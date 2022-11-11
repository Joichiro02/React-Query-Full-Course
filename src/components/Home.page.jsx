import React, { useEffect } from 'react';

const HomePage = () => {
    useEffect(() => {
        // console.log("homepage");
        // return () => {
        //     console.log("clean up homepage");
        // }
    }, []);

    return (
        <div className='home-page'>Home page</div>
    )
}

export default HomePage