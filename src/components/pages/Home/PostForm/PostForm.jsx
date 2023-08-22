import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../contexts/AuthProvider';

const PostForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useContext(AuthContext);

    const handleAddPost = (data) => {
        console.log(data);
        reset();
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

                    {/* For uploading Image, we will implement later*/}
                    {/* <div className="form-control w-full max-w-xs my-auto">
                        <label className="label">
                            <span className="label-text text-blue-400">Upload a Photo</span>
                        </label>
                        <input {...register("postImage")} type="file" className="file-input file-input-bordered file-input-info w-full max-w-lg" />
                    </div> */}

                    {/* Photo url */}
                    <div className="form-control w-full my-auto">
                        <label className="label"><span className="label-text">Photo URL</span></label>
                        <input {...register("photoURL")} type="text" placeholder="Your photoURL" className="input input-bordered w-full" />
                        {errors.photoURL && <p className='text-sm mt-2 text-red-500'>{errors.photoURL?.message}</p>}
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