import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiArrowRight,
    FiEye,
    FiEyeOff,
    FiLock,
    FiMail,
    FiShield,
} from "react-icons/fi";
import { adminLogin } from "../services/adminUserApi";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "9002209551",
        password: "Bose510@R2026#Estate",
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.username || !formData.password) {
            setError(
                "Username/email and password are required."
            );
            return;
        }

        try {
            setLoading(true);

            const result = await adminLogin(formData);
            if (result.success) {
                //console.log("LOGIN SUCCESS:", result);

                localStorage.setItem(
                    "adminUser",
                    JSON.stringify(result.user)
                );

                // console.log(
                //     "Stored adminUser:",
                //     localStorage.getItem("adminUser")
                // );

                // console.log("Navigating to /admin/dashboard");

                navigate("/admin/dashboard", {
                    replace: true,
                });
            }
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                "Unable to login. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
  const loginData = sessionStorage.getItem("adminLoginAsUser");

  if (!loginData) return;

  try {
    const data = JSON.parse(loginData);

    setFormData((prev) => ({
      ...prev,
      username: data.phoneno || "",
      password: data.password || "",
    }));

    // Remove immediately after binding
    sessionStorage.removeItem("adminLoginAsUser");
  } catch (error) {
    console.error("Invalid admin login data");
    sessionStorage.removeItem("adminLoginAsUser");
  }
}, []);

    return (
        <div className="login-page1">
            <div className="login-decoration login-decoration-one" />
            <div className="login-decoration login-decoration-two" />
            <div className="container">
                <div className="row min-vh-100 align-items-center justify-content-center">
                    <div className="col-12 col-md-9 col-lg-10 col-xl-9">
                        <div className="login-container">
                            <div className="row g-0">
                                {/* LEFT */}
                                <div className="col-lg-6 d-none d-lg-flex">
                                    <div className="login-brand-panel">
                                        <div>
                                            <div className="brand-logo-large">
                                                <img src="/images/logo.webp" alt="51oearth" />
                                            </div>
                                            <h1>
                                                Real Estate
                                                <br />
                                                Management
                                            </h1>

                                            <p>
                                                Manage properties, agents,
                                                customers and leads from one
                                                powerful dashboard.
                                            </p>
                                        </div>

                                        <div className="login-feature-list">
                                            <div>
                                                <span>
                                                    <FiShield />
                                                </span>
                                                Secure administration
                                            </div>

                                            <div>
                                                <span>
                                                    <FiArrowRight />
                                                </span>
                                                Powerful management tools
                                            </div>

                                            <div>
                                                <span>
                                                    <FiArrowRight />
                                                </span>
                                                Real-time business insights
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div className="col-lg-6">
                                    <div className="login-form-panel">
                                        <div className="mobile-brand">
                                            <div className="brand-logo">
                                                <img src="/images/logo.webp" alt="51oearth" />
                                            </div>
                                            <span>REAL ESTATE</span>
                                        </div>

                                        <div className="login-heading">
                                            <span className="login-kicker">
                                                ADMIN PORTAL
                                            </span>

                                            <h2>Welcome back</h2>

                                            <p>
                                                Sign in to access your
                                                administration dashboard.
                                            </p>
                                        </div>

                                        {error && (
                                            <div className="alert alert-danger login-alert">
                                                {error}
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group-modern">
                                                <label>
                                                    Username or Email
                                                </label>

                                                <div className="input-icon-wrapper">
                                                    <FiMail />

                                                    <input
                                                        type="text"
                                                        name="username"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        placeholder="Enter username or email"
                                                        autoComplete="username"
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group-modern">
                                                <label>Password</label>

                                                <div className="input-icon-wrapper">
                                                    <FiLock />

                                                    <input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="Enter your password"
                                                        autoComplete="current-password"
                                                    />

                                                    <button
                                                        type="button"
                                                        className="password-toggle"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <FiEyeOff />
                                                        ) : (
                                                            <FiEye />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="login-submit"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" />
                                                        Signing in...
                                                    </>
                                                ) : (
                                                    <>
                                                        Sign in
                                                        <FiArrowRight />
                                                    </>
                                                )}
                                            </button>
                                        </form>

                                        <div className="login-footer">
                                            <span>© 2026 Real Estate</span>
                                            <span>Secure Admin Portal</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;