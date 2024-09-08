'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie'; 
import '@/styles/Dashboard.css';

const Dashboard = () => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get('jwtToken'); 
        if (!token) {
            router.push('/');
            return;
        }
        const id = Cookies.get('userId'); 
        const name = Cookies.get('userName');
        setUserId(id || '');
        setUserName(name || '');
    }, [router]);
    const handleLogout = () => {
        Cookies.remove('jwtToken'); 
        Cookies.remove('userId');
        Cookies.remove('userName');
        router.push('/');
    };
    return (
        <section className='dashboard'>
            <div className='wrapper'>
                <Image width={4300} height={3000} src="./wrapper.webp" alt="login wrapper" />
            </div>
            <div className='user-info-container'>
                <div className='user-content'>
                    <h1>Welcome, <span> {userName} </span> !</h1>
                    <p>Your User ID is: <span> {userId} </span></p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
