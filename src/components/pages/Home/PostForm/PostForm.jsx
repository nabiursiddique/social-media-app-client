import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const PostForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const imageHostKey = import.meta.env.VITE_APP_imagebb_key;

    // date and time 
    const currentDate = new Date();
    const date = format(currentDate, 'PP');
    const time = format(currentDate, 'hh:mm:ss a');

    const handleAddPost = (data) => {
        // Image hosting
        const image = data.postPhoto[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((imgData) => {
                // Posting with image
                if (imgData.success) {
                    const post = {
                        userName: user?.displayName,
                        userPhoto: user?.photoURL,
                        postContent: data.postContent,
                        postPhotoURL: imgData.data.url,
                        date,
                        time,
                        like: [],
                        comments: []
                    }

                    // Sending post data to the database
                    fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success("Post Successful");
                                reset();
                                navigate('/media')
                            } else {
                                toast.error("Post is not successful");
                            }
                        })
                }
                else {
                    // Posting without image
                    const post = {
                        userName: user?.displayName,
                        userPhoto: user?.photoURL,
                        postContent: data.postContent,
                        postPhotoURL: '',
                        date,
                        time,
                        like: [],
                        comments: []
                    }

                    // Sending post data to the database
                    fetch('http://localhost:5000/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success("Post Successful");
                                reset();
                                navigate('/media')
                            } else {
                                toast.error("Post is not successful");
                            }
                        })

                }
            })
            .catch((error) => {
                console.log(error);
            });


    }

    return (
        <div className='mb-5'>

            <form onSubmit={handleSubmit(handleAddPost)}>
                <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-20 gap-4 lg:mx-32 md:mx-20 mx-8 mb-5'>
                    <div className='form-control w-full'>
                        <label className="label">
                            <span className="label-text text-blue-400">Write Your Thoughts</span>
                        </label>
                        <textarea {...register("postContent", {
                            required: "Post content is required."
                        })} placeholder="write here..." className="textarea textarea-bordered textarea-lg w-full max-w-lg" ></textarea>
                        {errors.postContent && <p className='text-sm mt-2 text-red-500'>{errors.postContent?.message}</p>}
                    </div>

                    {/* For uploading Image*/}
                    <div className="form-control w-full my-auto">
                        <label className="label">
                            <span className="label-text text-blue-400">Photo</span>
                        </label>
                        <input {...register("postPhoto")} type="file" className="file-input file-input-bordered  file-input-info w-full" />
                        {errors.postPhoto && <p className='text-sm mt-2 text-red-500'>{errors.postPhoto?.message}</p>}
                    </div>
                </div>
                <div className='flex justify-center'>
                    {
                        user ?
                            <input value='Post' className='btn btn-outline btn-info btn-wide' type="submit" />
                            :
                            <>
                                <div>
                                    <input value='Post' className='btn btn-outline btn-info btn-wide' type="submit" disabled />
                                    <p className='text-center mt-2 text-indigo-400'>Please Sign In to post</p>
                                </div>
                            </>
                    }
                </div>
            </form>

        </div>
    );
};

export default PostForm;