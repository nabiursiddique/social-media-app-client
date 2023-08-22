import React from 'react';
import MediaCard from './MediaCard';

const Media = () => {
    return (
        <div>
            <h1 className='text-center mb-3 mt-2 text-xl'>All Posts</h1>
            <div className='flex justify-center my-5'>
                <div>
                    <MediaCard />
                    <MediaCard />
                </div>
            </div>
        </div>
    );
};

export default Media;