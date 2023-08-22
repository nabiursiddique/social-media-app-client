import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const EditInfoModal = ({ university, address }) => {
    const { user } = useContext(AuthContext);

    const handleUpdateProfile = () => {
        console.log('handle update profile');
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className='text-lg font-bold text-center'>Your Profile Infos</h3>

                    <form onSubmit={handleUpdateProfile} className='mt-10'>
                        <input name='name' type="text" defaultValue={user?.displayName} placeholder="Your Name" className="input input-bordered w-full mb-3" disabled />
                        <input name='email' type="email" defaultValue={user?.email} placeholder="Email" className="input input-bordered w-full mb-3" disabled />
                        <input name='university' type="text" placeholder="University Name" className="input input-bordered w-full mb-3" defaultValue={university} />

                        <input name='address' type="text" placeholder="Address" className="input input-bordered w-full mb-3" defaultValue={address} />
                        <br />
                        <input className='mb-3 w-full btn btn-outline btn-info' type="submit" value="Update" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditInfoModal;