import React from 'react';
import MediaCard from './MediaCard';

const Media = () => {
    return (
        <div className='flex justify-center my-5'>
            <div>
                <MediaCard />
                <MediaCard />
            </div>
        </div>
    );
};

export default Media;