import React, { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav>
            <h2 className="font-semibold text-2xl">Chat Adda</h2>
            <ul>
                <li>
                    <Link>Chat</Link>
                    <Link>Profile</Link>
                    <Link>Setting</Link>
                    <Link>Home</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;







