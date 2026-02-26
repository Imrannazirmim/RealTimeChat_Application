import { NavLink } from "react-router";
import { useAuthStore } from "../../store/useAuthStore.js";

const Navbar = () => {
    const { authUser } = useAuthStore();

    return (
        <nav className="container mx-auto flex justify-between py-10 border-b border-gray-700">
            <h2 className="font-semibold text-2xl text-pink-600">Chat Adda</h2>
            <ul>
                {authUser ? (
                    <div className="flex  items-center gap-10">
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/setting">Setting</NavLink>
                        </li>
                    </div>
                ) : (
                    <div className="flex  items-center gap-10">
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup">SignUp</NavLink>
                        </li>
                    </div>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
