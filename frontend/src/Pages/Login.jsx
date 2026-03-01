import React, { useState } from "react";
import loginImg from "../assets/login.webp";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Toaster } from "react-hot-toast";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, isLogginIn } = useAuthStore();

    const handleLogin = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <>
            <Toaster />
            <main className="container mx-auto flex gap-10 mt-20 border border-gray-700 rounded-2xl h-[50vh]">
                <div className="w-full">
                    <img
                        className="h-full rounded-l-2xl"
                        src={loginImg}
                        alt="Login Image"
                    />
                </div>
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-6 mt-10 w-full px-10"
                >
                    <h2 className="text-2xl font-semibold">
                        Login In Your Account
                    </h2>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email:</label>
                        <input
                            className="border w-full p-2 rounded-xl"
                            type="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2 relative">
                        <label htmlFor="password">Password</label>
                        <input
                            className="border relative w-full p-2 rounded-xl"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="flex absolute right-2 top-10 cursor-pointer"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </div>
                    </div>
                    <div className="text-end">
                        <Link
                            className="text-blue-500 underline"
                            to="/forget-password"
                        >
                            Forget Password
                        </Link>
                    </div>
                    <div className="text-center">
                        <button
                            className="py-2 w-full px-8 rounded bg-blue-500 hover:bg-blue-600 cursor-pointer"
                            type="submit"
                            disabled={isLogginIn}
                        >
                            {isLogginIn ? (
                                <>
                                 <Loader2 className="size-5 animate-spin" />
                                 Login...
                                </>
                            ):(
                                'Login'
                            )}
                           
                        </button>
                    </div>
                    <div>
                        <p>
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="underline text-blue-400"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Login;
