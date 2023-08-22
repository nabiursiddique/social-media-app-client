import React from 'react';
import { BiLike, BiMessage, BiSolidLike } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useLoaderData } from 'react-router-dom';

const PostDetails = () => {
    const postInfo = useLoaderData();
    const { postContent, postPhotoURL, userName, userPhoto, date, time, like } = postInfo;
    return (
        <div>
            <h1 className='text-center my-3 text-xl'>Post Details</h1>
            <div className='ml-3 mb-3 lg:flex md:flex justify-center w-1/2 '>
                <Link to='/media'>
                    <AiOutlineArrowLeft className='text-3xl hover:text-blue-200' />
                </Link>
            </div>
            <div className='flex justify-center'>
                <div className="card lg:max-w-xl md:max-w-lg sm:max-w-md max-w-full mx-5 bg-base-100 shadow-xl border border-blue-300 my-6">
                    <div className="card-body">
                        <div className='flex justify-center items-center mb-1'>
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src={userPhoto} />
                                </div>
                            </div>
                            <p className='ml-4 font-bold text-blue-400'>{userName}</p>
                        </div>
                        <p className='text-xs'><span className='font-bold'>Posted on:</span> <span className='font-bold text-blue-600'>{date}</span>  {time}</p>
                        <p>{postContent}</p>
                    </div>
                    {
                        postPhotoURL &&
                        <figure className='mb-2'><img src={postPhotoURL} alt="Cars" /></figure>
                    }
                    <div className='mb-2 ml-5 flex items-center'>
                        <BiSolidLike className='text-3xl text-blue-600' />
                        {
                            like.length < 1 ?
                                <p className='ml-2 font-semibold'>No Likes</p>
                                :
                                <h1 className='ml-2'>
                                    {
                                        like.map((user, ind) => <p key={ind}><span>{user}</span>, </p>)
                                    }
                                </h1>
                        }
                    </div>

                    <hr className='border border-blue-300' />
                    <p className='ml-7 mt-3'>All Comments</p>
                    <div className="chat chat-start m-2 ml-6">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://superstarsbio.com/wp-content/uploads/2021/02/Shirley-Setia.jpg" />
                            </div>
                        </div>
                        <div className="chat-bubble">This car is super awsome.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;