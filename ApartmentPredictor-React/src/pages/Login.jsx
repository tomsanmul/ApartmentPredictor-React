import { useState } from "react";
import { useAuth } from "react-oidc-context";

export default function Login() {
  const auth = useAuth();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  // si ya está logueado
  if (auth.isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">Ya estás logueado</h1>

          <p>{auth.user?.profile?.email}</p>

          <button
            className="login-button"
            onClick={() => auth.removeUser()}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1 className="login-title">Login</h1>

        {/* 🔥 IMPORTANTE: Cognito NO usa user/password aquí */}
        <p style={{ marginBottom: "10px", color: "#666" }}>
          Login gestionado por AWS Cognito
        </p>

        <form className="login-form">

          <div className="login-field">
            <label>User</label>
            <input
              type="text"
              placeholder="Not used (Cognito handles auth)"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              disabled
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Not used"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled
            />
          </div>

          <a href="#" className="login-forgot">Forgot?</a>
          <a href="#" className="login-register">Register</a>

          {/* 🚀 BOTÓN REAL DE LOGIN */}
          <button
            type="button"
            className="login-button"
            onClick={() => auth.signinRedirect()}
          >
            Login with Cognito
          </button>

        </form>

      </div>
    </div>
  );
}