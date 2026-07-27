import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";

const panelVariants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: "0%", opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ for redirect

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    } else {
      setError("");
    }

    try {
      const response = await fetch("https://medimate-git-562216568812.europe-west1.run.app/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      const { success, message, error, jwtToken } = data;

      if (success) {
        // ✅ Save user info + token
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("signedUpUser", name);

        // ✅ Redirect to dashboard directly
        navigate("/dashboard", { replace: true });
      } else {
        const details = error?.details?.[0]?.message || message;
        setError(details || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen relative">
      {/* Animated Left panel */}
      <motion.div
        className="hidden md:flex absolute left-0 w-1/2 h-full bg-[var(--color-primary)] items-center justify-center flex-col px-8 text-center"
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <img
          src="/login.png"
          alt="Miffy"
          className="w-auto mb-6 drop-shadow-lg"
        />
        <h1 className="text-4xl font-bold text-[var(--color-secondary)] mb-4">
          Welcome!
        </h1>
      </motion.div>

      {/* Right panel - form */}
      <div className="absolute right-0 w-full md:w-1/2 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-screen w-full px-8">
          <h1 className="text-3xl text-[var(--color-primary)] font-bold pb-10">
            Let&apos;s get you started.
          </h1>

          {error && <p className="text-red-500 font-medium mb-3">{error}</p>}

          <form className="w-full max-w-sm space-y-6" onSubmit={handleSignup}>
            <input
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-3xl bg-gray-100 shadow-inner focus:ring-2 focus:ring-cyan-400"
              type="text"
              placeholder="Enter name"
              value={signupInfo.name}
            />

            <input
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-3xl bg-gray-100 shadow-inner focus:ring-2 focus:ring-cyan-400"
              type="email"
              placeholder="Enter email"
              value={signupInfo.email}
            />

            <input
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-3xl bg-gray-100 shadow-inner focus:ring-2 focus:ring-cyan-400"
              type="password"
              placeholder="Enter password"
              value={signupInfo.password}
            />

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-40 py-3 rounded-3xl bg-[var(--color-primary)] text-white font-semibold hover:bg-cyan-700 transition"
              >
                Sign Up
              </button>
            </div>

            <span className="flex justify-center items-center pt-2 text-sm">
              Already have an account?{" "}
              <Link
                className="ml-1 text-[var(--color-primary)] hover:underline"
                to="/login"
              >
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
