'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import '@/styles/Login.css';
import { LockKeyhole, Mail } from "lucide-react";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { loginUser } from '@/store/authSlice';
import Cookies from 'js-cookie';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isButtonEnabled, setIsButtonEnabled] = useState(false);
const [isLoggingIn, setIsLoggingIn] = useState(false);
const [error, setError] = useState('');
const router = useRouter();
const dispatch = useAppDispatch();
const { isLoading, token } = useAppSelector((state: RootState) => state.auth);

useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
    router.push('/dashboard');
    }
}, [router]);

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

useEffect(() => {
    if (validateEmail(email) && password) {
    setIsButtonEnabled(true);
    } else {
    setIsButtonEnabled(false);
    }
}, [email, password]);

const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggingIn(true);
    dispatch(loginUser({ email, password }));
};

useEffect(() => {
    if (token) {
    router.push('/dashboard');
    }
}, [token, router]);

return (
    <section className='login'>
    <div className='login-wrapper'>
        <Image width={4300} height={3000} src="./wrapper.webp" alt="login wrapper" />
    </div>
    <div className='login-container'>
        <div className="login-form">
        <Image alt="meetus logo" src="./logo.png" width={846} height={143} />
        <h1>Welcome Back</h1>
        <p>Step into the metaverse for an unforgettable experience</p>
        <form onSubmit={handleLogin}>
            {error && <p className="error-message">{error}</p>}

            <div className="input">
            <label><Mail /></label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                setEmail(e.target.value);
                setError('');
                }}
            />
            </div>

            <div className="input">
            <label><LockKeyhole /></label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                setPassword(e.target.value);
                setError('');
                }}
            />
            </div>

            <button
            type="submit"
            className={isButtonEnabled ? 'enabled' : 'disabled'}
            disabled={!isButtonEnabled || isLoggingIn}
            >
            {isLoggingIn ? 'Logging in...' : 'Login'}
            </button>
        </form>

        <h2>Don&apos;t have an account? <Link href="/sign-up" aria-label="signup link">Sign up</Link></h2>
        </div>
    </div>
    </section>
);
};

export default Login;
