'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import '@/styles/Dashboard.css';

const Dashboard = () => {
const [userId, setUserId] = useState('');
const [userName, setUserName] = useState('');
const router = useRouter();
const dispatch = useAppDispatch();

useEffect(() => {
    const token = Cookies.get('jwtToken');
    const tokenExpiry = Cookies.get('tokenExpiry');

    if (!token || (tokenExpiry && new Date().getTime() > Number(tokenExpiry))) {
    dispatch(logout());
    router.push('/');
    return;
    }

    const id = Cookies.get('userId');
    const name = Cookies.get('userName');
    setUserId(id || '');
    setUserName(name || '');
}, [router, dispatch]);

const handleLogout = () => {
    dispatch(logout());
    router.push('/');
};

return (
    <section className='dashboard'>
    <div className='wrapper'>
        <Image width={4300} height={3000} src="./wrapper.webp" alt="login wrapper" />
    </div>
    <div className='user-info-container'>
        <div className='user-content'>
        <h1>Welcome, <span>{userName}</span>!</h1>
        <p>Your User ID is: <span>{userId}</span></p>
        <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
    </section>
);
};

export default Dashboard;
