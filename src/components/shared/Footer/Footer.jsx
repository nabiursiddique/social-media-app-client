import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-300 text-base-content">
            <div>
                <span className="footer-title">Services</span>
                <a className="link link-hover">Development</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
            </div>
            <div>
                <span className="footer-title">Social</span>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.linkedin.com/in/nabiur-siddique/" target='blank'>
                        <FaLinkedinIn className='text-2xl text-blue-600 hover:text-blue-400' />
                    </a>
                    <a href="https://www.facebook.com/nabiur.siddique.official" target='blank'>
                        <FaFacebookF className='text-2xl text-blue-600 hover:text-blue-400' />
                    </a>
                    <a href="https://twitter.com/NabiurSiddique" target='blank'>
                        <FaTwitter className='text-2xl text-blue-600 hover:text-blue-400' />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;