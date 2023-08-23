import React, { useContext } from 'react';
import { BiLike, BiMessage, BiReceipt, BiSolidLike } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AiOutlineSend } from "react-icons/ai";

const MediaCard = ({ post, refetching }) => {
    const { user } = useContext(AuthContext);
    const { _id, postContent, postPhotoURL, userName, userPhoto, date, time, like, comments } = post;
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    // Handling likes count
    const handleLike = () => {
        if (!user) {
            navigate('/signIn')
        }

        const liker = like.filter((liker) => liker === user?.email);
        const newLikes = [...like, user?.email];

        if (liker.length === 0 && user?.email) {
            // Updating likes 
            fetch(`http://localhost:5000/posts/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newLikes)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        refetching();
                        toast.success("Liked");
                    }
                })
        }
    }

    // posting comments
    const handleComments = (data) => {
        if (!user) {
            toast.error('Please sign in to write a comment');
            navigate('/signIn');
        }
        const comment = {
            email: user?.email,
            comment: data.comment,
            commenter: user.photoURL
        }
        const newComments = [...comments, comment];

        fetch(`http://localhost:5000/postscomments/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newComments)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetching();
                    toast.success('comment added.')
                }
            })
        reset();
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
                {
                    like.filter((liker) => liker === user?.email).length > 0 ?
                        <button onClick={handleLike} className='flex items-center text-blue-400 btn lg:btn-md btn-sm btn-ghost'>
                            <BiLike className='text-3xl mr-2' />
                            <h1>Liked</h1>
                        </button>
                        :
                        <button onClick={handleLike} className='flex items-center hover:text-blue-400 btn lg:btn-md btn-sm btn-ghost'>
                            <BiLike className='text-3xl mr-2' />
                            <h1>Like</h1>
                        </button>

                }

                <button className='flex items-center hover:text-green-400 btn lg:btn-md btn-sm btn-ghost'>
                    <Link to={`/post/${_id}`} >
                        <div className='flex items-center'>
                            <BiMessage className='text-3xl mr-2' />
                            <h1>Comments</h1>
                        </div>
                    </Link>
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
            <hr className='border border-blue-300' />
            {/* For comment */}
            <div>
                <form onSubmit={handleSubmit(handleComments)}>
                    <div className='form-control grid grid-cols-2 mx-3'>
                        <p className='my-auto font-semibold'>Comment Here</p>
                        <div className='flex justify-center items-center'>
                            <textarea {...register("comment", { required: true })} placeholder="write here..." className="textarea textarea-bordered textarea-xs w-full max-w-xs my-2" ></textarea>
                            <button type='submit'>
                                <AiOutlineSend type='submit' className='text-xl ml-2 hover:text-blue-400' />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MediaCard;