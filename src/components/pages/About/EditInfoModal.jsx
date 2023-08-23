import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';

const EditInfoModal = ({ currentuser }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { name, email, university, address } = currentuser;

    const handleUpdateProfile = (data) => {
        console.log(data);
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className='text-lg font-bold text-center'>Edit Your Profile Infos</h3>

                    <form onSubmit={handleSubmit(handleUpdateProfile)} className='mt-10'>

                        <input {...register("name")} type="text" placeholder="Your Name" className="input input-bordered w-full mb-3" defaultValue={name} />
                        {errors.name && <p className='text-sm mt-2 text-red-500'>{errors.name?.message}</p>}

                        <input {...register("email")} type="text" placeholder="Your Email" className="input input-bordered w-full mb-3" value={email} />
                        {errors.email && <p className='text-sm mt-2 text-red-500'>{errors.email?.message}</p>}

                        <input {...register("university")} type="text" placeholder="Your University Name" className="input input-bordered w-full mb-3" defaultValue={university} />
                        {errors.university && <p className='text-sm mt-2 text-red-500'>{errors.university?.message}</p>}

                        <input {...register("address")} type="text" placeholder="Your Address" className="input input-bordered w-full mb-3" defaultValue={address} />
                        {errors.address && <p className='text-sm mt-2 text-red-500'>{errors.address?.message}</p>}

                        <br />

                        <input className='mb-3 w-full btn btn-outline btn-info' type="submit" value="Update" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditInfoModal;