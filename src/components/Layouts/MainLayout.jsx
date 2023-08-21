import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;