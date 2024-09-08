'use client';

import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import { RootState } from '@/store/store';
import Image from 'next/image';
import '@/styles/Dashboard.css'

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { userId, userName } = useAppSelector((state: RootState) => state.auth);

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
                    <h1>Welcome, <span> {userName} </span> !</h1>
                    <p>Your User ID is: <span> {userId} </span></p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;