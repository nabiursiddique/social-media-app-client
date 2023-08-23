import React, { useEffect, useState } from 'react';
import MediaCard from './MediaCard';
import { useQuery } from '@tanstack/react-query';
import LoadingAnimation from '../../LittleComponents/LoadingAnimation/LoadingAnimation';

const Media = () => {
    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/posts');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    });

    const refetching = () => {
        refetch();
    }

    if (isLoading) {
        return <LoadingAnimation></LoadingAnimation>;
    }

    return (
        <div>
            <h1 className='text-center mb-3 mt-2 text-xl'>All Posts</h1>
            <div className='flex justify-center my-5'>
                <div>

                    {
                        posts.toReversed().map(post => <MediaCard key={post._id} post={post} refetching={refetching} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Media;