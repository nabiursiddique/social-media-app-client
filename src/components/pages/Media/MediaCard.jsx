import React from 'react';
import { BiLike, BiMessage, BiReceipt, BiSolidLike } from "react-icons/bi";
import { Link } from 'react-router-dom';

const MediaCard = ({ post }) => {
    const { _id, postContent, postPhotoURL, userName, userPhoto, date, time, like } = post;

    const handleLike = () => {

    }

    return (
        <div className="card lg:max-w-xl md:max-w-lg sm:max-w-md max-w-sm mx-5 bg-base-100 shadow-xl border border-blue-300 mb-6">
            <div className="card-body">
                <div className='flex justify-center items-center mb-1'>
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={userPhoto} />
                        </div>
                    </div>
                    <p className='ml-4 font-bold'>{userName}</p>
                </div>
                <p className='text-xs'><span className='font-bold'>Posted on:</span> <span className='font-bold text-blue-600'>{date}</span>  {time}</p>
                <p>{postContent}</p>
            </div>
            {
                postPhotoURL !== '' &&
                <figure className='mb-2'><img src={postPhotoURL} alt="Post photo" /></figure>
            }
            <div className='mb-2 ml-5 flex items-center'>
                <BiSolidLike className='text-2xl text-blue-600' />
                {
                    like.length < 1 ?
                        <p className='ml-2 font-semibold'>No Likes</p>
                        :
                        <p className='ml-2 font-semibold'>{like.length}</p>
                }
            </div>
            <hr className='border border-blue-300' />
            <div className='flex justify-evenly py-3'>
                <button onClick={handleLike} className='flex items-center hover:text-blue-400 btn lg:btn-md btn-sm btn-ghost'>
                    <BiLike className='text-3xl mr-2' />
                    <h1>Like</h1>
                </button>
                <button className='flex items-center hover:text-green-400 btn lg:btn-md btn-sm btn-ghost'>
                    <BiMessage className='text-3xl mr-2' />
                    <h1>Comments</h1>
                </button>
                <button className='hover:text-sky-400 btn lg:btn-md btn-sm btn-ghost'>
                    <Link to={`/post/${_id}`} >
                        <div className='flex items-center'>
                            <BiReceipt className='text-3xl mr-2' />
                            <h1>Details</h1>
                        </div>
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default MediaCard;