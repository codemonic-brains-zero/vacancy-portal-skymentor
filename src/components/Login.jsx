import React, { useState } from 'react';
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import logo from "../assets/common/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';  
import { signInWithEmailAndPassword } from "firebase/auth";
import Bgimage from '../assets/common/bg-img.png';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User logged in:', user);
            navigate('/nav/home'); // Redirect to home page after successful login
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    return (
        <>
      <div className="container py-12 bg-cover bg-no-repeat bg-center max-w-full min-h-screen flex flex-col items-center" style={{ backgroundImage: `url(${Bgimage})` }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                alt="Your Company"
                src={logo}
                className="mx-auto h-10 w-auto"
            />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-200">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-md font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-[#25433] border-2 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-md font-medium leading-6 text-white">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-yellow-200 hover:text-green-200">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-2 border-[#254336] p-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    {showPassword ? (
                                        <GrFormView />
                                    ) : (
                                        <GrFormViewHide />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#254336] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-200 hover:text-green-800 hover:border hover:border-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-100">
                        Not Registered?&nbsp;
                        <Link to='/register' className="font-semibold leading-6 text-yellow-200 hover:text-green-200">
                            Create a new account!
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
