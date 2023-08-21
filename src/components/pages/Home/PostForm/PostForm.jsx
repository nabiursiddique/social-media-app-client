import React from 'react';
import { useForm } from 'react-hook-form';

const PostForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const handleAddPost = (data) => {
        console.log(data.postContent);
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
                    {/* For uploading Image */}
                    <div className="form-control w-full max-w-xs my-auto">
                        <label className="label">
                            <span className="label-text text-blue-400">Upload a Photo</span>
                        </label>
                        <input {...register("postImage")} type="file" className="file-input file-input-bordered file-input-info w-full max-w-lg" />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <input value='Post' className='btn btn-outline btn-info btn-wide' type="submit" />
                </div>
            </form>
        </div>
    );
};

export default PostForm;