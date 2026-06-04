import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/signin"
                    element={<Signin />}
                />

                <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
                />
                
                <Route
                path="/signup"
                element={<Signup />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;