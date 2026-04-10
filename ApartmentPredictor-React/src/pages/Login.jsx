import { useState } from "react";
import { signIn, signOut } from "aws-amplify/auth";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      await signIn({
        username: user,
        password: password,
      });

      setLogged(true);
    } catch (err) {
      setError(err.message || "Login error");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setLogged(false);
      setUser("");
      setPassword("");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1 className="login-title">Login</h1>

        {logged ? (
          <>
            <p>✅ Estás logueado</p>

            <button
              type="button"
              className="login-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <form className="login-form">

            <div className="login-field">
              <label>User</label>
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                type="text"
              />
            </div>

            <div className="login-field">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
              type="button"
              className="login-button"
              onClick={handleLogin}
            >
              Login
            </button>

          </form>
        )}

      </div>
    </div>
  );
}