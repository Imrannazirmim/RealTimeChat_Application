import React from "react";
import { useState } from "react";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <h2>Sign Up</h2>
                <div>
                    <label htmlFor="username">UserName:</label>
                    <input
                        type="text"
                        placeholder="enter your name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData }, e.target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder="Example@gmail.com" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="*********" />
                </div>
            </form>
        </>
    );
};

export default SignUp;
