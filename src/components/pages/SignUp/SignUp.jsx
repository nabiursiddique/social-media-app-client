import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const imageHostKey = import.meta.env.VITE_APP_imagebb_key;

    const navigate = useNavigate();

    // Sign up with email and password
    const handleSignUp = (data) => {
        setSignUpError('');
        createUser(data.email, data.password)
            .then((result) => {
                const user = result.user;
                const image = data.image[0];
                const formData = new FormData();
                formData.append('image', image);
                const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then((res) => res.json())
                    .then((imgData) => {
                        const userInfo = {
                            displayName: data.name,
                            photoURL: imgData.data.url
                        }
                        updateUser(userInfo)
                            .then(() => {
                                saveUserToDB(data.name, data.email, imgData.data.url);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        setSignUpError(error.message);
                    });
            })
            .catch((error) => {
                console.log(error);
            });


    }

    // Sign up with google
    const google = () => {
        googleSignIn()
            .then(result => {
                const { uid, displayName, email, photoURL } = result.user;
                if (uid) {
                    saveUserToDB(displayName, email, photoURL);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    // save user to db
    const saveUserToDB = (userName, email, photoURL) => {
        const user = {
            name: userName,
            email: email,
            photoURL: photoURL,
            address: '',
            university: ''
        }
        fetch('https://social-media-server-pink.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Account Created Successfully');
                    reset();
                    navigate('/');
                }
            })

    }

    return (
        <div className='h-auto flex justify-center items-center'>
            <div className='w-96 p-7 my-7 mx-3 shadow-lg border border-blue-200 rounded-lg'>
                <h2 className='text-center text-4xl mt-5 font-extrabold'>SIGN UP</h2>

                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input {...register("name", {
                            required: "Name is required.",
                            maxLength: { value: 15, message: "Maximum 15 characters." },
                            minLength: { value: 4, message: "Name must be at least 4 letters" }
                        })} type="text" placeholder="Your Name" className="input input-bordered w-full" />
                        {errors.name && <p className='text-sm mt-2 text-red-500'>{errors.name?.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", {
                            required: "Email Address is required."
                        })} type="text" placeholder="Your Email" className="input input-bordered w-full" />
                        {errors.email && <p className='text-sm mt-2 text-red-500'>{errors.email?.message}</p>}
                    </div>

                    {/* Users photo upload */}
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Your Photo</span>
                        </label>
                        <input {...register("image", {
                            required: "Your photo is required."
                        })} type="file" placeholder="Type here" className="file-input file-input-bordered file-input-info w-full" />
                        {errors.image && <p className='text-sm mt-2 text-red-500'>{errors.image?.message}</p>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password", {
                            required: "Password is required.",
                            maxLength: 20,
                            minLength: { value: 6, message: "Password must be at least 6 characters." },
                            pattern: {
                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                message: 'Password must be strong.'
                            }
                        })} type="password" placeholder="Your Password" className="input input-bordered w-full" />
                        {errors.password && <p className='text-sm mt-2 text-red-500'>{errors.password?.message}</p>}
                        <label className="label"><span className="label-text">Forget Password?</span></label>
                    </div>
                    {
                        signUpError && <p className='text-red-500 my-2'>{signUpError}</p>
                    }
                    <input value='Sign Up' className='btn w-full my-4 btn-info text-white hover:bg-blue-600 border-none' type="submit" />
                </form>
                <p className='text-sm text-center'>Already have an account? <Link className='text-blue-400' to='/signIn'>Sign In</Link> </p>
                <div className="divider">OR</div>
                <button onClick={google} className='btn btn-outline btn-info w-full'><span className=' text-xl'><FaGoogle /></span>GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;