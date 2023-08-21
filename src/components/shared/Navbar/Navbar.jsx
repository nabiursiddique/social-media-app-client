import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const menu = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/media">Media</Link></li>
            <li><Link to="/message">Message</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/signIn">Sign In</Link></li>
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
                <ul className="menu menu-horizontal px-1 hidden lg:flex">
                    {menu}
                </ul>
                <Link to='/about'>
                    <div className="avatar">
                        <div className="w-9 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-1">
                            <img src="https://thumbs.dreamstime.com/z/male-avatar-icon-portrait-handsome-young-man-face-beard-vector-illustration-%D0%B3%D1%9F%D0%B3%D2%91%D0%B3%C2%B7%D0%B3-%D0%B3%D1%96%D0%B3%D1%98-187127123.jpg" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;