import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBalance, transferMoney } from "../api/account";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const [balance, setBalance] = useState(0);
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loadBalance = async () => {
            try {
                const data = await getBalance();
                setBalance(data.balance);
            } catch (error) {
                console.error(error);
            }
        };

        loadBalance();
    }, []);

    async function handleTransfer() {
        try {
            setLoading(true);

            const data = await transferMoney(
                email,
                Number(amount)
            );

            alert(data.message);

            setBalance(data.currentBalance);
            setEmail("");
            setAmount("");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                alert(
                    error.response?.data?.message ??
                    "Transfer failed"
                );
            } else {
                alert("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    return (
        <div className="dashboard-page">
            <nav className="dashboard-navbar">
                <div className="navbar-logo">
                    Payments App
                </div>

                <div className="navbar-actions">
                    <span className="navbar-user">
                        Welcome 👋
                    </span>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="dashboard-container">
                <section className="welcome-section">
                    <h1>Welcome Back</h1>

                    <p>
                        Manage your balance and transfer
                        funds securely.
                    </p>
                </section>

                <section className="balance-card">
                    <div className="balance-label">
                        Current Balance
                    </div>

                    <div className="balance-amount">
                        ₹{balance}
                    </div>

                    <div className="balance-footer">
                        Available to spend
                    </div>
                </section>

                <section className="transfer-card">
                    <h2>Transfer Money</h2>

                    <div className="transfer-form">
                        <input
                            type="email"
                            placeholder="Recipient Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) =>
                                setAmount(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="transfer-button"
                            onClick={handleTransfer}
                            disabled={loading}
                        >
                            {loading
                                ? "Sending..."
                                : "Send Money"}
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}