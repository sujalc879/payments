import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "../styles/Signup.css";
import { signup } from "../api/auth";

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignup() {
        if (!email || !password || !firstName || !lastName) {
            alert("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const data = await signup({
                email,
                password,
                firstName,
                lastName,
            });

            alert(data.message);
            navigate("/signin");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ??
                    "Signup failed"
                );
            } else {
                alert("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="signup-page">
            <div className="signup-card">
                <div className="signup-header">
                    <h1>Create Account</h1>

                    <p>
                        Start managing your payments securely
                    </p>
                </div>

                <div className="signup-form">
                    <div className="name-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) =>
                                setFirstName(e.target.value)
                            }
                        />

                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) =>
                                setLastName(e.target.value)
                            }
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="signup-button"
                        onClick={handleSignup}
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                    <p className="signin-link">
                        Already have an account?{" "}
                        <Link to="/signin">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}