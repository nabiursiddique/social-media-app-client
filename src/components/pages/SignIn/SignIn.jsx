import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    // For route after login
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // Sign In with Email and Password
    const handleSignIn = (data) => {
        setLoginError('');
        signIn(data.email, data.password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                toast.success('Sign In Successful');
                reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message);
            })
    }

    // Sign In with google
    const google = () => {
        googleSignIn()
            .then(result => {
                const { uid, displayName, email, photoURL } = result.user;
                if (uid) {
                    toast.success('Sign In Successful');
                    navigate(from, { replace: true });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='h-auto flex justify-center items-center'>
            <div className='w-96 p-7 my-7 mx-3 shadow-lg border border-blue-200 rounded-lg'>
                <h2 className='text-center text-4xl mt-5 font-extrabold'>SIGN IN</h2>

                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input {...register("email", { required: "Email Address is required." })} type="text" placeholder="Your Email" className="input input-bordered w-full" />
                        {errors.email && <p className='text-sm mt-2 text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input {...register("password", {
                            required: "Password is required.",
                            maxLength: 20,
                            minLength: { value: 6, message: "Password must be at least 6 characters." }
                        })} type="password" placeholder="Your Password" className="input input-bordered w-full" />
                        {errors.password && <p className='text-sm mt-2 text-red-500'>{errors.password?.message}</p>}
                        <div>
                            {
                                loginError && <p className='text-red-500 mt-2'>{loginError}</p>
                            }
                        </div>
                        <label className="label"><span className="label-text">Forget Password?</span></label>
                    </div>
                    <input value='Sign In' className='btn w-full my-4 btn-info  text-white hover:bg-blue-600 border-none' type="submit" />
                </form>
                <p className='text-sm text-center'>New to <span className='text-blue-500'>Social</span> Media? <Link className='text-blue-400' to='/signUp'>Sign Up</Link> </p>
                <div className="divider">OR</div>
                <button onClick={google} className='btn btn-outline btn-info w-full'><span className='text-xl'><FaGoogle /></span>GOOGLE</button>
            </div>
        </div>
    );
};

export default SignIn;