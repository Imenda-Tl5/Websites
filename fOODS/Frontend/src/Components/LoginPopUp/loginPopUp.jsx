import React, { useState } from "react";
import "./loginPopUp.css";
const LoginPopUp = ({ login, setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const url =
      login === "signUp"
        ? "http://localhost:5001/api/auth/register"
        : "http://localhost:5001/api/auth/login";
    const payload =
      login === "signUp" ? { username, email, password } : { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      alert(login === "signUp" ? "Signup successful!" : "Login successful!");
      setLogin("logged_in"); // Update login state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <div className="header">
          <div className="log-in-head">
            <h1>{login === "signUp" ? "SIGNUP" : "LOGIN"}</h1>{" "}
            <h1 onClick={() => setLogin(false)} className="close">
              X
            </h1>
          </div>
        </div>
        <form action="">
          <div className="">
            <div className="input-fields">
              {login === "signUp" ? (
                <input type="text" id="name" onChange={(e)=>setName(e.target.value)} value={username}placeholder="Your Name" />
              ) : (
                <></>
              )}
              <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Your Email" />
              <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Password" />
            </div>
        {error && <p className="error-message">{error}</p>}
            
          </div>
          <div className="info">
            <p>
              {login === "signUp"
                ? "already  have an account"
                : "dont have an account yet"}
              ? Click here to{" "}
              <span
                onClick={() =>
                  setLogin((prev) => (prev === "logIn" ? "signUp" : "logIn"))
                }
              >
                {login === "signUp" ? "logIn" : "signUp"}
              </span>{" "}
            </p>
            <button onClick={handleSubmit}>{loading?"processing":login === "signUp" ? "create Account" : "Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopUp;
