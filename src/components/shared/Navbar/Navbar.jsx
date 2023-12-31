import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import DarkLightModeToggle from '../../DarkLightModeToggle/DarkLightModeToggle';

const Navbar = () => {
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

    const menu = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/media">Media</Link></li>
            <li><Link to="/message">Message</Link></li>

            {
                user?.uid ?
                    <>
                        <li><Link to="/about">About</Link></li>
                        <li onClick={handleLogout}><a href=''>Sign Out</a></li>
                    </>
                    :
                    <li><Link to="/signIn">Sign In</Link></li>
            }
        </>
    )
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost text-xl">Social Media<span className='text-blue-600 text-2xl'>.</span></Link>
            </div>
            <div className="navbar-end mr-2">
                <ul className="menu menu-horizontal px-1 hidden lg:flex mr-1">
                    {menu}
                </ul>
                <DarkLightModeToggle />
                {
                    user?.photoURL &&
                    <Link to='/about'>
                        <div className="avatar">
                            <div className="w-9 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-1">
                                <img src={user.photoURL} alt='user photo' />
                            </div>
                        </div>
                    </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;