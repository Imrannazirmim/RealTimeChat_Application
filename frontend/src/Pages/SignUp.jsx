import {useState} from "react";
import loginImg from "../assets/login.webp";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {Link} from "react-router";
import {useAuthStore} from "../store/useAuthStore";
import toast, {Toaster} from "react-hot-toast";

const SignUp = () => {
    const {signUp, isSignUp} = useAuthStore();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const validationForm = () => {
        if (!formData.fullName.trim()) {
            toast.error("Full name is required");
            return false;
        }

        if (!formData.email.trim()) {
            toast.error("Email is required");
            return false;
        }

        if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                formData.email,
            )
        ) {
            toast.error("Invalid email format");
            return false;
        }

        if (!formData.password.trim()) {
            toast.error("Password is required");
            return false;
        }

        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }

        return true;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const success = validationForm();
        if (success) {
            signUp(formData);
        }
    };

    return (
        <>
            <Toaster/>

            <main className="container mx-auto flex gap-10 mt-20 border border-gray-700 rounded-2xl h-[50vh]">
                {/* Image Section */}
                <div className="w-full">
                    <img
                        className="h-full w-full object-cover rounded-l-2xl"
                        src={loginImg}
                        alt="Register"
                    />
                </div>

                {/* Form Section */}
                <section className="flex flex-col gap-6 mt-8 w-full px-10">
                    <h2 className="text-2xl font-semibold">
                        Register In Your Account
                    </h2>

                    <form
                        onSubmit={handleFormSubmit}
                        className="flex flex-col gap-5"
                    >
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                className="border w-full p-2 rounded-xl"
                                type="text"
                                value={formData.fullName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        fullName: e.target.value,
                                    })
                                }
                                placeholder="Enter full name"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="border w-full p-2 rounded-xl"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                placeholder="Enter email"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                className="border w-full p-2 rounded-xl pr-10"
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
                                className="absolute right-3 top-10 cursor-pointer text-gray-500"
                            >
                                {showPassword ? (
                                    <EyeOff size={20}/>
                                ) : (
                                    <Eye size={20}/>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                className="py-2 w-full px-8 rounded bg-blue-500 hover:bg-blue-600 cursor-pointer flex items-center justify-center gap-2 text-white"
                                type="submit"
                                disabled={isSignUp}
                            >
                                {isSignUp ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin"/>
                                        Loading...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Login Redirect */}
                    <div>
                        <p>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="underline text-blue-400"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default SignUp;
