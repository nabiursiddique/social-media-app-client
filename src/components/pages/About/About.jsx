import React, { useContext } from 'react';
import { BiSolidEdit } from "react-icons/bi";
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import EditInfoModal from './EditInfoModal';
import { useQuery } from '@tanstack/react-query';
import LoadingAnimation from '../../LittleComponents/LoadingAnimation/LoadingAnimation';

const About = () => {
    const { user, logout } = useContext(AuthContext);

    // For logout
    const handleLogout = () => {
        logout()
            .then(() => {
                toast.success('Sign Out Successful');
            })
            .catch(error => {
                console.log(error);
                toast.error('Sign Out Not successful')
            })
    }

    // for getting user info from the database
    const { data: currentuser = [], isLoading, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://social-media-server-pink.vercel.app/users?email=${user.email}`);
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    });


    if (isLoading) {
        return (
            <LoadingAnimation></LoadingAnimation>

        )
    }

    return (
        <div>
            <div className=''>
                <div className='flex my-10 justify-center items-center'>
                    <div className="card-compact bg-base-100 shadow-xl border border-blue-200 py-4 px-3" >

                        {/* Edit Button */}
                        <div className='flex justify-end mr-2'>
                            <label className='btn btn-ghost' htmlFor="booking-modal">
                                <BiSolidEdit className='text-2xl text-blue-300 hover:text-blue-500' />
                            </label>
                        </div>

                        <div className="avatar flex justify-center">
                            <div className="w-40 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                                {
                                    user?.photoURL ?
                                        <img src={user.photoURL} />
                                        :
                                        <img src="https://thumbs.dreamstime.com/z/male-avatar-icon-portrait-handsome-young-man-face-beard-vector-illustration-%D0%B3%D1%9F%D0%B3%D2%91%D0%B3%C2%B7%D0%B3-%D0%B3%D1%96%D0%B3%D1%98-187127123.jpg" />

                                }
                            </div>
                        </div>
                        <div className="card-body">
                            <h2 className="text-2xl text-center font-bold">
                                {currentuser?.name}
                            </h2>
                            <h4 className='text-base'><span className='font-bold'>Email: </span>{currentuser?.email}</h4>
                            <h4 className='text-base'><span className='font-bold'>University: </span>{currentuser?.university}</h4>
                            <h4 className='text-base'><span className='font-bold'>Address: </span>{currentuser?.address}</h4>
                            <div className="card-actions justify-center">
                                <button onClick={handleLogout} className="btn btn-outline btn-info w-full mt-4">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                user &&
                <EditInfoModal
                    currentuser={currentuser}
                    refetch={refetch}
                ></EditInfoModal>
            }
        </div>
    );
};

export default About;