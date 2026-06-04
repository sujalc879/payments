import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/Signin.css";
import { signin } from "../api/auth";

export default function Signin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignin() {
        try {
            setLoading(true);

            const data = await signin({
                email,
                password,
            });

            localStorage.setItem("token", data.token);

            navigate("/dashboard");
        } catch (error) {
            alert("Invalid credentials");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="signin-page">
            <div className="signin-card">
                <div className="signin-header">
                    <h1>Welcome Back</h1>

                    <p>
                        Sign in to access your account and
                        manage payments securely
                    </p>
                </div>

                <div className="signin-form">
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
                        className="signin-button"
                        onClick={handleSignin}
                        disabled={loading}
                    >
                        {loading
                            ? "Signing In..."
                            : "Sign In"}
                    </button>

                    <p className="signup-link">
                        Don't have an account?{" "}
                        <Link to="/signup">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}