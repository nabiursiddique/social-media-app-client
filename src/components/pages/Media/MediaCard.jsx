import React from 'react';
import { BiLike, BiMessage, BiReceipt } from "react-icons/bi";

const MediaCard = () => {
    return (
        <div className="card lg:max-w-xl md:max-w-lg sm:max-w-md max-w-sm mx-5 bg-base-100 shadow-xl border border-blue-300 mb-6">
            <div className="card-body">
                <div className='flex justify-center items-center mb-1'>
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://thumbs.dreamstime.com/z/male-avatar-icon-portrait-handsome-young-man-face-beard-vector-illustration-%D0%B3%D1%9F%D0%B3%D2%91%D0%B3%C2%B7%D0%B3-%D0%B3%D1%96%D0%B3%D1%98-187127123.jpg" />
                        </div>
                    </div>
                    <p className='ml-4 font-bold text-blue-400'>Erhan</p>
                </div>
                <p>This is one of the fastest car in the world till now.We are really exited to make this car and we are expecting that more people will able to buy this car day by day</p>
            </div>
            <figure className='mb-2'><img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200" alt="Cars" /></figure>
            <div className='mb-2 ml-5'>
                <p>no likes</p>
            </div>
            <hr className='border border-blue-300' />
            <div className='flex justify-evenly py-3'>
                <button className='flex items-center hover:text-blue-400'>
                    <BiLike className='text-3xl mr-2' />
                    <h1>Like</h1>
                </button>
                <button className='flex items-center hover:text-green-400'>
                    <BiMessage className='text-3xl mr-2' />
                    <h1>Comments</h1>
                </button>
                <button className='flex items-center hover:text-sky-400'>
                    <BiReceipt className='text-3xl mr-2' />
                    <h1>Details</h1>
                </button>
            </div>
        </div>
    );
};

export default MediaCard;