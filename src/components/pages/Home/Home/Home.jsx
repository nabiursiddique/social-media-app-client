import React from 'react';
import Banner from '../Banner/Banner';
import PostForm from '../PostForm/PostForm';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Banner />
            <PostForm />
        </div>
    );
};

export default Home;